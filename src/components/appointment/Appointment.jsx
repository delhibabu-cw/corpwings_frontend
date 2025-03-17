import React, { useState, useRef, useEffect } from "react";
import { BiReset } from "react-icons/bi";

import video from "../../img/video.mp4"; // Video file
import "./Appointment.css"; // Import the CSS file for styling

import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FaTimes } from "react-icons/fa";
// import LoaderScreen from "../loader";
import { postUserApi } from "../../api-service/authApi";
import LoaderPage from "../loaderPage";

const Appointment = () => {

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

  console.log(errors);
  console.log(watch('skills'));
  
const [loadingPage , setLoadingPage] = useState(false)
  const [connectivityInput, setConnectivityInput] = useState("");
  const [connectivityList, setConnectivityList] = useState([]);

  const handleConnectivityKeyDown = (e) => {
    if (e.key === "Enter" && connectivityInput.trim() !== "") {
      setConnectivityList([...connectivityList, connectivityInput]);
      setValue("skills", [...connectivityList, connectivityInput]);
      setConnectivityInput(""); // Clear the input after adding
      e.preventDefault(); // Prevent form submission when pressing Enter
    }
  };

  const removeConnectivity = (indexToRemove) => {
    const newConnectivityList = connectivityList.filter(
      (_, index) => index !== indexToRemove
    );
    setConnectivityList(newConnectivityList);
    setValue("skills", newConnectivityList); // Update the form value
  };

//   const formValues = watch(); // Watch all form values
// const isFormFilled = Object.values(formValues).some(value => 
//   (Array.isArray(value) ? value.length > 0 : value?.toString().trim() !== "")
// );


    // submit function
    const onSubmit = async (data) => {

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
            setConnectivityList([]); // Reset skills list
            setConnectivityInput(""); // Reset input field
            toast.success(postApi?.data?.msg)
            navigate('/')
          }
        }catch(err){
          console.log(err)  
        }finally{
            setLoadingPage(false)
        }
          }

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play(); // Play the video automatically on mount
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };


  return (
    <>
    <div className="appointment-container py-5">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s">
            <div className="section-title text-start">
              <h4 className="sub-title pe-3 mb-0">BEST DIGITAL MARKETING</h4>
              <h1 className="display-4 mb-4">
                Best Quality Services and Expert Solutions
              </h1>
              <p
                className="mb-4"
                style={{ color: "#8d8d8d", fontSize: "18px" }}
              >
                At CorpWings, were on a mission to revolutionize the digital
                marketing landscape. Founded with a vision to empower businesses
                of all sizes, we bring together a dedicated team of passionate
                experts who thrive on innovation and creativity.
              </p>
              <div className="video-container">
                <video
                  ref={videoRef}
                  width="100%"
                  height="auto"
                  controls
                  muted
                  onClick={handlePlayPause}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div
            className="col-lg-6 wow fadeInRight position-relative"
            data-wow-delay="0.4s"
          >
            <div className="appointment-form rounded p-5">
              <p className="fs-4 text-uppercase text-primary">Get In Touch</p>
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
      </div>
    </div>
    
    {loadingPage && <LoaderPage/>}
    </>
    
  );
};

export default Appointment;
