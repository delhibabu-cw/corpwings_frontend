import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authSingleUploadApi, getAuthCarrersApi, getProfileApi, postJobApplicationApi } from "../../api-service/authApi";
import "./CareersSinglePage.css";
import imageStyles from "../../components/animation/imageLoader/imageLoader.module.css";
import { MdCancel, MdEdit, MdLocationOn } from "react-icons/md";
import { FaArrowRight, FaTimes, FaXRay } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import LoaderPage from "../../components/loaderPage";
import DocumentViewer from "../../components/documentViewer";
import { getCarrersApi, getJobApplicationApi } from "../../api-service/admin";
import NoDataFound from "../../components/noDataFound";
import { FaArrowLeftLong, FaArrowRightLong, FaChevronDown } from "react-icons/fa6";
import Pagination from "../../components/pagination";
import { IoMdEye } from "react-icons/io";
import { isFormatDate } from "../../utils/helper";
import JobApplicationView from "../JobApplicationView";

const CarrersSinglePage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const profileApiData = useQuery({
        queryKey: ["profileApiData"],
        queryFn: () => getProfileApi(),
      });
    
      const profileData = profileApiData?.data?.data?.result;

  const carrersAuthApiData = useQuery({
    queryKey: ["carrersAuthApiData", id],
    queryFn: () => getAuthCarrersApi(`/${id}`),
  });

  const carrersAuthData = carrersAuthApiData?.data?.data?.result;
  
  const carrersApiData = useQuery({
    queryKey: ["carrersApiData", id],
    queryFn: () => getCarrersApi(`/${id}`),
  });

  const carrersData = carrersApiData?.data?.data?.result;



  const [loader, setLoader] = useState(true);
  const [loading , setLoading] = useState(false)
  const [error, setError] = useState(false);

  const [documentItem, setDocumentItem] = useState({});
  const [documentModal, setDocumentModal] = useState(false);

  const [showApply, setShowApply] = useState(false);

  const schema = yup.object({
    fullName: yup.string().required("This Field is reqiured."),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobile: yup
      .string()
      .required("Mobile Number is required"),
      // .test(
      //   "valid-length",
      //   "Phone number must be 10 digits",
      //   (value) => !value || /^[0-9]{10}$/.test(value) // Only validate length if value exists
      // ),
    yearOfGraduation: yup.string().required("This Field is required."),
    gender: yup.string().required("This Field is required."),
    experience: yup.string().required("This Field is required."),
    expectedCTC: yup.string().optional(),
    noticePeriod: yup.string().required("This Field is required."),
    skillSet: yup
      .array()
      .of(yup.string().required())
      .required("This Field is required."),
    vacany: yup.string().optional(),
    currentLocation: yup.string().required("This Field is required."),
    resume: yup.string().required("This Field is required."),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });



  const watchResume = watch("resume");

  const [connectivityInput, setConnectivityInput] = useState("");
  const [connectivityList, setConnectivityList] = useState([]);

  const handleConnectivityKeyDown = (e) => {
    if (e.key === "Enter" && connectivityInput.trim() !== "") {
      setConnectivityList([...connectivityList, connectivityInput]);
      setValue("skillSet", [...connectivityList, connectivityInput]);
      setConnectivityInput(""); // Clear the input after adding
      e.preventDefault(); // Prevent form submission when pressing Enter
    }
  };

  const removeConnectivity = (indexToRemove) => {
    const newConnectivityList = connectivityList.filter(
      (_, index) => index !== indexToRemove
    );
    setConnectivityList(newConnectivityList);
    setValue("skillSet", newConnectivityList); // Update the form value
  };

  const handleUploadImage = async (e) => {
    console.log(e);
    
    const file = e.target.files?.[0]; // Get the first selected file
    console.log(file);
    
    const allowedFileTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf',
    ];

    // Validate file size and type
    if (!file) {
        toast.error('No file selected.');
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        4
        toast.error('File size exceeds 2MB.');
        return;
    }
    if (!allowedFileTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.type}`);
        return;
    }

    try {
        setLoading(true)

        const formData = new FormData();
        formData.append('file', file); // Append the single file to FormData

        console.log(formData);
        

        const uploadData = await authSingleUploadApi(formData); // Assuming this handles single file upload too
        console.log(uploadData);
        if (uploadData && uploadData?.data.result?.location) {
          const uploadedImage = uploadData.data.result?.location; // Adjust based on the API response structure
          setValue('resume', uploadedImage); // Update the form state
          toast.success(uploadData?.data?.msg);
      }
        
    } catch (err) {
        console.log(err)
    } finally {
        setLoading(false)
    }
};


  // submit function
  const onSubmit = async (data) => {

try{
  setLoading(true)

  const payload = {
    fullName : data?.fullName,
    email : data?.email,
    mobile : data?.mobile,
    yearOfGraduation : data?.yearOfGraduation,
    gender : data?.gender,
    experience : data?.experience,
    expectedCTC : data?.expectedCTC,
    noticePeriod : data?.noticePeriod,
    skillSet : data?.skillSet,
    vacany : data?.vacany,
    currentLocation : data?.currentLocation,
    resume : data?.resume,
    career : id
  }

  console.log(payload);

  const postApi = await postJobApplicationApi(payload)

  if(postApi?.status === 200){
    toast.success(postApi?.data?.msg)
    navigate('/')
  }
}catch(err){
  console.log(err)  
}finally{
  setLoading(false)
}
    
  };

  // for job applications details
     const [modalId , setModalId] = useState('')
     const [openModal , setOpenModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
        const [isOpen, setIsOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState("10");
          const options = ["10", "15", "20", "25"]; // Add as many as you need
      
        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };
      
        const selectOption = (option) => {
            setSelectedValue(option);
            setIsOpen(false);
        };

        const jobApplysApiData = useQuery({
          queryKey: ["jobApplysApiData", id, currentPage, selectedValue],
          queryFn: () => getJobApplicationApi(`?career=${id}&currentPage=${currentPage}&perPage=${selectedValue}`),
        });
      
        const jobApplysData = jobApplysApiData?.data?.data?.result?.rows;
  
        const totalPages = jobApplysApiData?.data?.data?.result?.pagination?.pages;
  
        const handlePageChange = (page) => {
            setCurrentPage(page);
        }

  return (
    <>
     {profileData?.role?.name === "ADMIN" ? (
      <div className="admin-main-div">
       <div className="career-data-main-div">
       <div className="career-data-main-div-header">
              <img src={carrersData?.img_url} alt="" />
              <div className="details-div">
              <div className='one-div'>
                    <div className='second-div'>
                        <p>Name</p>
                        <p>:</p>
                    </div>
                    <h6 className='name-tag'>{carrersData?.name}</h6>
                </div>
              <div className='one-div'>
                    <div className='second-div'>
                        <p>Experience</p>
                        <p>:</p>
                    </div>
                    <h6 className='name-tag'>
                    {carrersData?.experience === '0'
                    ? "Fresher"
                    : `${carrersData?.experience} year${carrersData?.experience > 1 ? "s" : ""}`}
                    </h6>
                </div>
              <div className='one-div'>
                    <div className='second-div'>
                        <p>Location</p>
                        <p>:</p>
                    </div>
                    <h6 className='name-tag'>{carrersData?.location}</h6>
                </div>
              <div className='one-div'>
                    <div className='second-div'>
                        <p>Total Applications</p>
                        <p>:</p>
                    </div>
                    <h6 className='name-tag'>{carrersData?.totalApplications}</h6>
                </div>
              <div className='one-div'>
                    <div className='second-div'>
                        <p>Description</p>
                        <p>:</p>
                    </div>
                    <p className='description-tag'>{carrersData?.description}</p>
                </div>
              </div>
        </div>
        <div className="resp-div mt-4">
              <h5>Responsibilities</h5>
              {carrersData?.responsibilities?.map((item, index) => (
                <div className="resp-div-map" key={index}>
                  <GoDotFill className="dot-div" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="resp-div mt-4">
              <h5>Required Skills</h5>
              {carrersData?.skills?.map((item, index) => (
                <div className="resp-div-map" key={index}>
                  <GoDotFill className="dot-div" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="resp-div mt-4">
              <h5>Qualifications</h5>
              {carrersData?.qualifications?.map((item, index) => (
                <div className="resp-div-map" key={index}>
                  <GoDotFill className="dot-div" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
       </div>
          {jobApplysData?.length > 0 ? (
             <div className="table-div">
               <table class="table table-striped">
                 <thead>
                   <tr>
                     <th scope="col">S.No</th>
                     <th scope="col">Name</th>
                     <th scope="col">Mobile</th>
                     <th scope="col">Gender</th>
                     <th scope="col">Applied Date</th>
                     <th scope="col">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                 {jobApplysData?.map((item,index) => (
                     <tr key={index}>
                     <th scope="row">{index + 1}</th>
                     <td>{item?.fullName ? item?.fullName : "-"}</td>
                     <td>{item?.mobile}</td>
                     <td>{item?.gender}</td> 
                     <td>{isFormatDate(item?.createdAt)}</td>                                   
                     <td className="">
                       <button className="btn btn-info"
                       onClick={()=>{setOpenModal(true),setModalId(item?._id)}}
                       ><IoMdEye size={20}/></button>
                     </td>
                   </tr>
                 ))}
                 </tbody>
               </table>
                <div className="container mt-4 mb-5">
                           <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                               {/* Dropdown for Rows Per Page */}
                               <div className="position-relative">
                                   <button className="btn btn-light d-flex align-items-center gap-2" onClick={toggleDropdown}>
                                       <span className="fw-semibold">Rows per page:</span>
                                       <span className="fw-bold">{selectedValue}</span>
                                       <FaChevronDown className={`dropdown-icon ${isOpen ? "rotate" : ""}`} />
                                   </button>
               
                                   {isOpen && (
                                       <ul className="dropdown-menu show">
                                           {options.map((option, index) => (
                                               <li key={index}>
                                                   <button className="dropdown-item" onClick={() => selectOption(option)}>
                                                       {option}
                                                   </button>
                                               </li>
                                           ))}
                                       </ul>
                                   )}
                               </div>
               
                               {/* Pagination Controls */}
                               <nav aria-label="Pagination">
                                   <ul className="pagination mb-0">
                                       <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                                           <button
                                               className="page-link"
                                               aria-label="Previous"
                                               onClick={() => handlePageChange(currentPage - 1)}
                                               disabled={currentPage === 0}
                                           >
                                               <FaArrowLeftLong />
                                           </button>
                                       </li>
               
                                       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
               
                                       <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                                           <button
                                               className="page-link"
                                               aria-label="Next"
                                               onClick={() => handlePageChange(currentPage + 1)}
                                               disabled={currentPage === totalPages - 1}
                                           >
                                               <FaArrowRightLong />
                                           </button>
                                       </li>
                                   </ul>
                               </nav>
                           </div>
                       </div>
             </div>) : (
              <NoDataFound/>
            )}
      </div>
      ):(
        <div className="main-div">
        <div className="careers-banner-section">
          {loader && !error && (
            <div className="loader">
              <div className={imageStyles?.loader}></div>
            </div>
          )}
          <img
            src={carrersAuthData?.img_url}
            className={`${loader || error ? "hidden" : ""}`}
            onLoad={() => setLoader(false)}
            onError={() => {
              setLoader(false);
              setError(true);
            }}
          />
          <div className="carrers-black-screen">
            <div className="black-screen-content">
              <p>Corpwings IT Services & Consultancy</p>
              <h1>{carrersAuthData?.name}</h1>
              <p>
                <MdLocationOn /> Gudiyatham
              </p>
              {!showApply && (
                 <button className="btn btn-warning"
                 onClick={() => setShowApply(!showApply)}>
                   Apply Now <FaArrowRight />
                 </button>
              )}
            </div>
          </div>
        </div>

        {showApply ? (
          <div>
            <div className="form-div">
              <h5>Personal Details</h5>
              <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
                <div class="col-md-6">
                  <label for="fullName" class="form-label">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="fullName"
                    placeholder="Enter Your Full Name"
                    {...register("fullName")}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      );
                    }}
                  />
                  {errors.fullName && (
                    <p className="text-danger mt-2">
                      {errors?.fullName?.message}
                    </p>
                  )}
                </div>
                <div class="col-md-6">
                  <label for="email" class="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter Your Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-danger mt-2">{errors?.email?.message}</p>
                  )}
                </div>
                <div class="col-md-6">
                  <label for="contact" class="form-label">
                    Contact <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="contact"
                    placeholder="Enter Your Contact Number"
                    {...register('mobile')}
                    onInput={(e) => {
                      const input = e.currentTarget.value;
                      const cleanedInput = input.replace(/\D/g, "");
                      if (/^[6-9][0-9]{0,9}$/.test(cleanedInput)) {
                        e.currentTarget.value = cleanedInput;
                      } else {
                        e.currentTarget.value = cleanedInput.slice(0, -1);
                      }
                    }}
                    maxLength={10}
                  />
                  {errors.mobile && (
                    <p className="text-danger mt-2">
                      {errors?.mobile?.message}
                    </p>
                  )}
                </div>
                <div class="col-md-6">
                  <label for="gradutaionyear" class="form-label">
                    Year Of Gradutaion <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="graduationYear"
                    placeholder="Enter Your Graduated Year"
                    {...register("yearOfGraduation")}
                    onInput={(e) => {
                      let input = e.currentTarget.value;
                  
                      // Allow only digits (0-9)
                      input = input.replace(/\D/g, '');
                  
                      e.currentTarget.value = input;
                    }}
                  />
                  {errors.yearOfGraduation && (
                    <p className="text-danger mt-2">
                      {errors?.yearOfGraduation?.message}
                    </p>
                  )}
                </div>
                <div class="col-md-6">
                  <label for="inputState" class="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    id="inputState"
                    class="form-select"
                    {...register("gender")}
                  >
                    <option value="" selected>
                      Choose Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.gender && (
                    <p className="text-danger mt-2">
                      {errors?.gender?.message}
                    </p>
                  )}
                </div>
                <div class="col-md-6">
                  <label for="experience" class="form-label">
                    Experience In Years <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="experience"
                    placeholder="Enter Your Experience In Years"
                    {...register('experience')}
                    onInput={(e) => {
                      let input = e.currentTarget.value;

                      // Allow only numbers and a single decimal point
                      input = input.replace(/[^0-9.]/g, "");

                      // Prevent multiple dots
                      const dotCount = (input.match(/\./g) || []).length;
                      if (dotCount > 1) {
                        input = input.substring(0, input.lastIndexOf("."));
                      }

                      e.currentTarget.value = input;
                    }}
                  />
                  {errors.experience && (
                    <p className="text-danger mt-2">
                      {errors?.experience?.message}
                    </p>
                  )}
                </div>
                <div class="col-md-6">
                  <label for="expectedCtc" class="form-label">
                    Expected CTC(In Lakhs Per Annum){" "}
                  </label>
                  <input
                      type="text"
                      className="form-control"
                      id="expectedCtc"
                      placeholder="Enter Your Expected CTC"
                      {...register('expectedCTC')}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/^[0]/, '') // Remove leading 0
                          .replace(/[^0-9]/g, ''); // Allow only digits
                      }}
                    />
                  {errors.expectedCTC && (
                    <p className="text-danger mt-2">
                      {errors?.expectedCTC?.message}
                    </p>
                  )}
                </div>
                <div class="col-md-6">
                  <label for="noticePeriod" class="form-label">
                    Notice Period <span className="text-danger">*</span>
                  </label>
                  <select id="noticePeriod" class="form-select"
                   {...register("noticePeriod")}>
                    <option value='' selected>Choose Notice Period</option>
                    <option value='Immediate join'>Immediate Join</option>
                    <option value='15 Days'>15 Days</option>
                    <option value='1 Month'>1 Month</option>
                    <option value='3 Month'>3 Month</option>
                  </select>
                  {errors.noticePeriod && (
                    <p className="text-danger mt-2">
                      {errors?.noticePeriod?.message}
                    </p>
                  )}
                </div>
                <div class="col-md-6">
                  <label for="skillSet" class="form-label">
                    Skill Set <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="skillSet"
                    placeholder="Enter Your Skill's"
                    value={connectivityInput}
                    onChange={(e) => setConnectivityInput(e.target.value)}
                    onKeyDown={handleConnectivityKeyDown}
                  />
                  <div className="skill-main-div">
                  {connectivityList.map((connectivity, index) => (
                          <div key={index} className=" px-2 py-1 skill-div">
                            <span>{connectivity}</span>
                            <button
                              type="button"
                              onClick={() => removeConnectivity(index)}
                              className=""
                            >
                              <FaTimes size={10} />
                            </button>
                          </div>
                        ))}
                  </div>
                  {errors.skillSet && (
                    <p className="text-danger mt-2">
                      {errors?.skillSet?.message}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <label for="vacany" class="form-label">
                  How did you Know About this vacancy? 
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="vacany"
                    placeholder="Enter About this vacancy"
                    {...register('vacany')}
                  />
                  {errors.vacany && (
                    <p className="text-danger mt-2">
                      {errors?.vacany?.message}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <label for="vacany" class="form-label">
                  Current Location <span className="text-danger">*</span> 
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="vacany"
                    placeholder="Enter Your Current Location"
                    {...register('currentLocation')}
                  />
                  {errors.currentLocation && (
                    <p className="text-danger mt-2">
                      {errors?.currentLocation?.message}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Resume <span className="text-danger">*</span>
                  </label>
                  <div className="form-div-upload">
                    {watchResume ? (
                      <div className="uploaded-view">
                        {/* <a href={watchResume} target="_blank" className="btn btn-info"View></a> */}
                        <button
                        type="button"
                           onClick={() => {
                            setDocumentItem({
                                val: watchResume,
                                key: watchResume?.endsWith('.pdf') ? 'document' : 'image',
                                title: 'Resume'
                            });
                            setDocumentModal(true);
                        }}
                          className="btn btn-info"
                        >
                          {" "}
                          View <FaRegEye />
                        </button>
                        <MdCancel
                          className="cancel-btn"
                          onClick={() => setValue("resume", "")}
                        />
                      </div>
                    ) : (
                      <>
                        <label
                          htmlFor="formFile"
                          className="form-label input-click"
                        >
                          Upload Your Resume
                        </label>
                        <input
                          className="form-control upload-input"
                          type="file"
                          id="formFile"
                          onChange={handleUploadImage}
                        />
                      </>
                    )}
                  </div>
                  {errors.resume && (
                    <p className="text-danger mt-2">
                      {errors?.resume?.message}
                    </p>
                  )}
                </div>
                <div class="col-12 form-btn">
                  <button type="button" class="btn btn-danger"
                  onClick={()=>{setShowApply(false),reset(),setConnectivityInput('',setConnectivityList([]))}}>
                    Back
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="job-details-div">
            <div className="desc-div">
              <h5>Job Description</h5>
              <p>{carrersAuthData?.description}</p>
            </div>
            <div className="resp-div mt-4">
              <h5>Job Responsibilities</h5>
              {carrersAuthData?.responsibilities?.map((item, index) => (
                <div className="resp-div-map" key={index}>
                  <GoDotFill className="dot-div" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="resp-div mt-4">
              <h5>Required Skills</h5>
              {carrersAuthData?.skills?.map((item, index) => (
                <div className="resp-div-map" key={index}>
                  <GoDotFill className="dot-div" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="resp-div mt-4">
              <h5>Qualifications</h5>
              {carrersAuthData?.qualifications?.map((item, index) => (
                <div className="resp-div-map" key={index}>
                  <GoDotFill className="dot-div" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="desc-div">
              <h5>How to Apply</h5>
              <p>
                If you're passionate about {carrersAuthData?.name} and want to
                make an impact, we would love to hear from you! To apply, please
                submit your resume and portfolio by Clicking Apply Now Button
              </p>
            </div>
            <div className="applyNow-btn">
              <button
                className="btn btn-light"
                onClick={() => setShowApply(!showApply)}
              >
                Apply Now <FaArrowRight />
              </button>
            </div>
            <div className="extra-div">
              <p onClick={() => navigate("/careers")}>View All Jobs</p>|
              <p onClick={() => navigate("/")}>Visit Home Page</p>
            </div>
          </div>
        )}
      </div>
      )
    }
      

      <DocumentViewer
        open={documentModal}
        handleModal={() => setDocumentModal(!documentModal)}
        document={documentItem}
      />

      {openModal && (
        <JobApplicationView open={openModal} handleModal={()=>setOpenModal(!openModal)} modalId={modalId}/>
      ) }
      {(loading || carrersAuthApiData?.isLoading || carrersAuthApiData?.isFetching || carrersApiData?.isLoading || carrersApiData?.isFetching ||
        jobApplysApiData?.isLoading || jobApplysApiData?.isFetching
      ) && <LoaderPage/>}
    </>
  );
};

export default CarrersSinglePage;
