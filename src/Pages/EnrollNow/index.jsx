import React, { useState } from "react";
import axios from "axios";
import "./EnrollNow.css";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi, postUserApi } from "../../api-service/authApi";
import {  getUserApi } from "../../api-service/admin";
import toast from "react-hot-toast";
import { IoMdDownload, IoMdEye } from "react-icons/io";
import { isFormatDate } from "../../utils/helper";
import "bootstrap/dist/css/bootstrap.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import LoaderPage from "../../components/loaderPage";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination";
import { FaChevronDown, FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import EnrollDataView from "../EnrollDataView";

const EnrollNowPage = () => {

  const navigate = useNavigate()
  
  const [modalId , setModalId] = useState('')
     const [openModal , setOpenModal] = useState(false)

  const profileApiData = useQuery({
    queryKey: ["profileApiData"],
    queryFn: () => getProfileApi(),
  });

  const profileData = profileApiData?.data?.data?.result;

  function getHeaders() {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }
    return undefined;
  }

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

  const enrollApiData = useQuery({
    queryKey : ['enrollApiData', currentPage, selectedValue],
    queryFn : () => getUserApi(`?role=67cb1b8b4f663d64881f236c&currentPage=${currentPage}&perPage=${selectedValue}`)
  })

  const enrollData = enrollApiData?.data?.data?.result?.rows
  const totalPages = enrollApiData?.data?.data?.result?.pagination?.pages;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }


  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:4011/download-user", {
        responseType: "blob",
        ...getHeaders(),
      });

      toast.success("Enroll Data Downloaded Successfully...");
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = "EnrollData.xlsx"; // File name
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {}
  };

const [loadingPage , setLoadingPage] = useState(false)

    const schema = yup.object({
      fullName: yup.string().required("This Field is reqiured."),
      email: yup.string().email("Invalid email").required("Email is required"),
      mobile: yup.string().required("Mobile Number is required")
      .test(
        "valid-length",
        "Phone number must be 10 digits",
        (value) => !value || /^[0-9]{10}$/.test(value) // Only validate length if value exists
      ),
      location: yup.string().required("This Field is required."),
      gender: yup.string().required("This Field is required."),
      collegeName: yup.string().required("This Field is required."),
      degree: yup.string().required('This Field is required.'),
      skills: yup.string().required('This Field is required.'),
      // skills: yup
      //        .array()
      //        .of(yup.string().required())
      //        .required("This Field is required."),
    });
  
    const {
      register,
      handleSubmit,
      reset,
      watch,
      setValue,
      formState: { errors },
      control,
    } = useForm({
      resolver: yupResolver(schema),
    });


  // submit function
      const onSubmit = async (data) => {
  console.log(data);
  
          try{
              setLoadingPage(true)
              
              const payload = {
                  fullName : data?.fullName,
                  email : data?.email,
                  mobile : data?.mobile,
                  collegeName : data?.collegeName,
                  gender : data?.gender,
                  degree : data?.degree,
                  location : data?.location,
                  skills : data?.skills,
                  role : '67cb1b8b4f663d64881f236c'
                }
          
            console.log(payload);
          
            const postApi = await postUserApi(payload)
          
            if(postApi?.status === 200){
              reset()
              // setConnectivityList([]); // Reset skills list
              // setConnectivityInput(""); // Reset input field
              toast.success(postApi?.data?.msg)
              navigate('/')
            }
          }catch(err){
            console.log(err)  
          }finally{
              setLoadingPage(false)
          }
            }


  return (
    <>
      {profileData?.role?.name === "ADMIN" ? (
        <div className="main-div">
          <div className="header-section">
            <p className="fw-medium fs-4">Enroll Data</p>
            <button className="btn btn-light" onClick={handleDownload}>
              <IoMdDownload /> Download Data
            </button>
            {/* <button className="download-btn ">
      Download Data
    </button> */}

          </div>
          <div className="table-div">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {enrollData?.map((item,index) => (
                  <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item?.fullName ? item?.fullName : "-"}</td>
                  <td>{item?.mobile}</td>
                  <td>{item?.gender ? item?.gender : '-'}</td>
                  <td>{isFormatDate(item?.createdAt)}</td>
                  <td>
                    <button className="btn btn-info"
                    onClick={()=>{setOpenModal(true),setModalId(item?._id)}}><IoMdEye size={20}/></button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <div className="container mt-4 mb-5">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                {/* Dropdown for Rows Per Page */}
                <div className="position-relative">
                    <button 
                    // disabled={enrollData?.length === 0}
                     className="btn btn-light d-flex align-items-center gap-2" onClick={toggleDropdown}>
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
          </div>
        </div>
      ) : (
        <div className="main-div">
          <div
            className="col-lg-6 wow fadeInRight position-relative"
            data-wow-delay="0.4s"
          >
            <div className="main-form-div">
              {/* <p className="fs-4 text-uppercase text-primary">Get In Touch</p> */}
              <h1 className="display-5 mb-4 text-center">Enroll Now</h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="vibrant-glass-form"
              >
                <div className="row gy-3 gx-4">
                  <div className="col-xl-6">
                    <input
                      type="text"
                      name="fullName"
                      className="form-control py-3 "
                      placeholder="Full Name"
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
                  <div className="col-xl-6">
                    <input
                      type="email"
                      name="email"
                      className="form-control py-3 "
                      placeholder="Email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-danger mt-2">
                        {errors?.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="col-xl-6">
                    <input
                      type="tel"
                      name="whatsappNumber"
                      className="form-control py-3 "
                      placeholder="WhatsApp Number"
                      {...register("mobile")}
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
                  <div className="col-xl-6">
                    <select
                    // className="form-control py-3"
                      id="inputState"
                      class="form-control py-3"
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
                  <div className="col-xl-6">
                    <input
                      type="text"
                      name="collegeName"
                      className="form-control py-3 "
                      placeholder="College Name"
                      {...register("collegeName")}
                    />
                    {errors.collegeName && (
                      <p className="text-danger mt-2">
                        {errors?.collegeName?.message}
                      </p>
                    )}
                  </div>
                  <div className="col-xl-6">
                    <input
                      type="text"
                      name="degree"
                      className="form-control py-3 "
                      placeholder="Degree"
                      {...register("degree")}
                    />
                    {errors.degree && (
                      <p className="text-danger mt-2">
                        {errors?.degree?.message}
                      </p>
                    )}
                  </div>
                  <div className="col-xl-6">
                    <input
                      type="text"
                      name="location"
                      className="form-control py-3 "
                      placeholder="Your location"
                      {...register("location")}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /[^a-zA-Z\s]/g,
                          ""
                        );
                      }}
                    //   onInput={(e) => {
                    //     let input = e.currentTarget.value;

                    //     // Allow only digits (0-9)
                    //     input = input.replace(/\D/g, "");

                    //     e.currentTarget.value = input;
                    //   }}
                    />
                    {errors.location && (
                      <p className="text-danger mt-2">
                        {errors?.location?.message}
                      </p>
                    )}
                  </div>
                  <div className="col-xl-6">
                    <input
                      type="text"
                      name="Skills"
                      className="form-control py-3 "
                      placeholder="Enter Your Skills"
                      {...register("skills")}
                    />
                    {errors.skills && (
                      <p className="text-danger mt-2">
                        {errors?.skills?.message}
                      </p>
                    )}
                  </div>
                  {/* <div class="col-xl-6">
                    <input
                      type="text"
                      class="form-control py-3"
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
                    {errors.skills && (
                      <p className="text-danger mt-2">
                        {errors?.skills?.message}
                      </p>
                    )}
                  </div> */}
                  <div className="col-12 submit-btn">
                    <button
                      type="submit"
                      className="btn btn-primary vibrant-btn w-100 py-3"
                    >
                      SUBMIT NOW
                    </button>
                  </div>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      )}

 {openModal && (
        <EnrollDataView open={openModal} handleModal={()=>setOpenModal(!openModal)} modalId={modalId}/>
      ) }
      {(enrollApiData?.isLoading ||loadingPage) && <LoaderPage/>}
    </>
  );
};

export default EnrollNowPage;
