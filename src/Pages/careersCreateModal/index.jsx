import React, { useEffect, useState } from "react";
import "./CareersCreateModal.css";
import { postJobApplicationApi } from "../../api-service/authApi";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FaTimes } from "react-icons/fa";
import { getCarrersApi, postCareersApi, putCareersApi, singleUploadApi } from "../../api-service/admin";
import LoaderPage from "../../components/loaderPage";
import { FaRegEye } from "react-icons/fa6";
import DocumentViewer from "../../components/documentViewer";
import { MdCancel } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

const CareersCreateModal = ({ open, handleModal, refetch, modalType, modalId }) => {

  if (!open) return null;

  const [loading, setLoading] = useState(false);
    const [documentItem, setDocumentItem] = useState({});
    const [documentModal, setDocumentModal] = useState(false);

  const schema = yup.object({
    name: yup.string().required("This Field is reqiured."),
    description: yup.string().required("Email is required"),
    experience: yup.string().required("This Field is required."),
    location: yup.string().required("This Field is required."),
    skills: yup
      .array()
      .min(1, "You must add at least one skill")
      .required("Skills are required"),
    responsibilities: yup
      .array()
      .min(1, "You must add at least one responsibility")
      .required("Responsibilties are required"),
    qualifications: yup
      .array()
      .min(1, "You must add at least one qualification")
      .required("Qualifications are required"),
    img_url: yup.string().required("This Field is required."),
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

  const watchResume = watch("img_url");
  

  const [skillInput, setSkillInput] = useState("");
  const [skillList, setSkillList] = useState([]);

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setSkillList([...skillList, skillInput]);
      setValue("skills", [...skillList, skillInput]); // Update form value
      setSkillInput(""); // Clear input
    }
  };

  const removeSkill = (indexToRemove) => {
    const updatedList = skillList.filter((_, index) => index !== indexToRemove);
    setSkillList(updatedList);
    setValue("skills", updatedList); // Update form value
  };

  const cancelSkillInput = () => {
    setSkillInput(""); // Clear input
  };

  const [responsibilitiesInput, setResponsibilitiesInput] = useState("");
  const [responsibilitiesList, setResponsibilitiesList] = useState([]);

  const addresponsibilities = () => {
    if (responsibilitiesInput.trim() !== "") {
      setResponsibilitiesList([...responsibilitiesList, responsibilitiesInput]);
      setValue("responsibilities", [
        ...responsibilitiesList,
        responsibilitiesInput,
      ]); // Update form value
      setResponsibilitiesInput(""); // Clear input
    }
  };

  const removeResponsibilities = (indexToRemove) => {
    const updatedList = responsibilitiesList.filter(
      (_, index) => index !== indexToRemove
    );
    setResponsibilitiesList(updatedList);
    setValue("responsibilities", updatedList); // Update form value
  };

  const cancelResponsibilitiesInput = () => {
    setResponsibilitiesInput(""); // Clear input
  };

  const [qualificationsInput, setQualificationsInput] = useState("");
  const [qualificationsList, setQualificationsList] = useState([]);

  const addQualifications = () => {
    if (qualificationsInput.trim() !== "") {
      setQualificationsList([...qualificationsList, qualificationsInput]);
      setValue("qualifications", [
        ...qualificationsList,
        qualificationsInput,
      ]); // Update form value
      setQualificationsInput(""); // Clear input
    }
  };

  const removeQualifications = (indexToRemove) => {
    const updatedList = qualificationsList.filter(
      (_, index) => index !== indexToRemove
    );
    setQualificationsList(updatedList);
    setValue("qualifications", updatedList); // Update form value
  };

  const cancelQualificationsInput = () => {
    setQualificationsInput(""); // Clear input
  };

  const handleUploadImage = async (e) => {
    console.log(e);

    const file = e.target.files?.[0]; // Get the first selected file
    console.log(file);

    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    // Validate file size and type
    if (!file) {
      toast.error("No file selected.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      4;
      toast.error("File size exceeds 2MB.");
      return;
    }
    if (!allowedFileTypes.includes(file.type)) {
      toast.error(`Invalid file type: ${file.type}`);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file); // Append the single file to FormData

      console.log(formData);

      const uploadData = await singleUploadApi(formData); // Assuming this handles single file upload too
      console.log(uploadData);
      if (uploadData && uploadData?.data.result?.location) {
        const uploadedImage = uploadData.data.result?.location; // Adjust based on the API response structure
        setValue("img_url", uploadedImage); // Update the form state
        toast.success(uploadData?.data?.msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const careersApiData = useQuery({
    queryKey : ['careersApiData', modalId?._id],
    queryFn : () => getCarrersApi(`/${modalId?._id}`),
    enabled: modalType === 'update'
  })

  const careersData = careersApiData?.data?.data?.result

  useEffect(()=>{
      if(careersData){
        setValue('name', careersData?.name)
        setValue('description', careersData?.description)
        setValue('experience', careersData?.experience)
        setValue('location', careersData?.location)
        setValue('img_url', careersData?.img_url)
        setValue("skills", careersData?.skills || []);  // Set initial skills list from careersData
        setSkillList(careersData?.skills || []); 
        setValue('responsibilities', careersData?.responsibilities || [])
        setResponsibilitiesList(careersData?.responsibilities || [])
        setValue('qualifications', careersData?.qualifications)
        setQualificationsList(careersData?.qualifications || [])
      }
  },[modalType, setValue, careersData])

  // submit function
  const onSubmit = async (data) => {
    try {
      setLoading(true)

      const payload = {
        name: data?.name,
        description: data?.description,
        experience: data?.experience,
        location: data?.location,
        responsibilities: data?.responsibilities,
        skills: data?.skills,
        qualifications: data?.qualifications,
        img_url: data?.img_url,
      };

      console.log(payload);
      if(modalType === 'create'){
        const postApi = await postCareersApi(payload)

        if(postApi?.status === 200){
          toast.success(postApi?.data?.msg)
          handleModal()
          refetch()
        }
      }else{
        const putApi = await putCareersApi(payload, modalId?._id)
        if (putApi?.status === 200) {
            toast.success(putApi?.data?.msg)
            handleModal()
            refetch()
        }
      }
     
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div className="overlay">
        <div className={`modal-content `}>
          <div className="modal-header">
            <h2 className="modal-title">{modalType === 'create' ? 'Create' : "Update"} Career</h2>
            <button type="button" className="close-btn" onClick={handleModal}>
              <span className="sr-only">Close</span>
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
              <div class="col-md-6">
                <label for="fullName" class="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="fullName"
                  placeholder="Enter Career Name"
                  {...register("name")}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    );
                  }}
                />
                {errors.name && (
                  <p className="text-danger mt-2">{errors?.name?.message}</p>
                )}
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Enter Description"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-danger mt-2">
                    {errors?.description?.message}
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
                  {...register("experience")}
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
                <label for="gradutaionyear" class="form-label">
                  Location <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="graduationYear"
                  placeholder="Enter Location"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-danger mt-2">
                    {errors?.location?.message}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="skillSet" className="form-label">
                  Skill's <span className="text-danger">*</span>
                </label>

                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    id="skillSet"
                    placeholder="Enter Skill's"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={addSkill}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelSkillInput}
                  >
                    Cancel
                  </button>
                </div>

                <div className="skill-main-div mt-2">
                  {skillList?.map((skill, index) => (
                    <div
                      key={index}
                      className="d-inline-block border bg-light px-2 py-1 m-1 rounded"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => removeSkill(index)}
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>

                {errors.skills && (
                  <p className="text-danger mt-2">{errors.skills.message}</p>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="responsibilities" className="form-label">
                  Responsibilities <span className="text-danger">*</span>
                </label>

                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    id="responsibilities"
                    placeholder="Enter Responsibilities"
                    value={responsibilitiesInput}
                    onChange={(e) => setResponsibilitiesInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={addresponsibilities}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelResponsibilitiesInput}
                  >
                    Cancel
                  </button>
                </div>

                <div className="skill-main-div mt-2">
                  {responsibilitiesList?.map((skill, index) => (
                    <div
                      key={index}
                      className="d-inline-block border bg-light px-2 py-1 m-1 rounded"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => removeResponsibilities(index)}
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>

                {errors.responsibilities && (
                  <p className="text-danger mt-2">
                    {errors.responsibilities.message}
                  </p>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="qualifications" className="form-label">
                  Qualifications <span className="text-danger">*</span>
                </label>

                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    id="qualifications"
                    placeholder="Enter Qualifications"
                    value={qualificationsInput}
                    onChange={(e) => setQualificationsInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={addQualifications}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelQualificationsInput}
                  >
                    Cancel
                  </button>
                </div>

                <div className="skill-main-div mt-2">
                  {qualificationsList?.map((skill, index) => (
                    <div
                      key={index}
                      className="d-inline-block border bg-light px-2 py-1 m-1 rounded"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => removeQualifications(index)}
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>

                {errors.qualifications && (
                  <p className="text-danger mt-2">
                    {errors.qualifications.message}
                  </p>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Upload Image <span className="text-danger">*</span>
                </label>
                <div className="form-div-upload">
                  {watchResume ? (
                    <div className="uploaded-view">
                      {/* <a href={uploaded} target="_blank" className="btn btn-info">
                      {" "}
                      View <FaRegEye />
                    </a> */}
                      <button
                        onClick={() => {
                          setDocumentItem({
                            val: watchResume,
                            key: watchResume?.endsWith(".pdf")
                              ? "document"
                              : "image",
                            title: "Image",
                          });
                          setDocumentModal(true);
                        }}
                        type="button"
                        className="btn btn-info"
                      >
                        {" "}
                        View <FaRegEye />
                      </button>
                      <MdCancel
                        className="cancel-btn"
                        onClick={() => setValue("img_url", "")}
                      />
                    </div>
                  ) : (
                    <>
                      <label
                        htmlFor="formFile"
                        className="form-label input-click"
                      >
                        Upload Image
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
                {errors.img_url && (
                  <p className="text-danger mt-2">{errors?.img_url?.message}</p>
                )}
              </div>
              <div class="col-12 form-btn">
                <button type="submit" class="btn btn-primary">
                  {modalType === 'update' ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {loading && <LoaderPage />}
      <DocumentViewer
        open={documentModal}
        handleModal={() => setDocumentModal(!documentModal)}
        document={documentItem}
      />
    </>
  );
};

export default CareersCreateModal;
