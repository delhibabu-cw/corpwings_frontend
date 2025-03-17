import React, { useState } from "react";
import imageStyles from "../../components/animation/imageLoader/imageLoader.module.css";
import Footer from "../../components/footer/Footer";
import ServicesBannerImg from "../../img/BannerSections/internship.jpg";
import "./Carrers.css";
import { useQuery } from "@tanstack/react-query";
import { deleteCareersApi, getCarrersApi } from "../../api-service/admin";
import { getAuthCarrersApi, getProfileApi } from "../../api-service/authApi";
import { useNavigate } from "react-router-dom";
import NoDataFound from "../../components/noDataFound";
import { IoAddSharp } from "react-icons/io5";
import { isFormatDate } from "../../utils/helper";
import { IoMdEye } from "react-icons/io";
import CareersCreateModal from "../careersCreateModal/index";
import LoaderPage from "../../components/loaderPage";
import Pagination from "../../components/pagination";
import { FaArrowLeftLong, FaArrowRightLong, FaChevronDown } from "react-icons/fa6";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

const CarrersPage = () => {

    const profileApiData = useQuery({
      queryKey: ["profileApiData"],
      queryFn: () => getProfileApi(),
    });
  
    const profileData = profileApiData?.data?.data?.result;

    const navigate = useNavigate()
    const [loading , setLoading] =useState(false)
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [openModal , setOpenModal] = useState(false)
  const [modalType , setModalType] = useState('')
  const [modalId , setModalId] = useState({})

  const carrersAuthApiData = useQuery({
    queryKey: ["carrersAuthApiData"],
    queryFn: () => getAuthCarrersApi(``),
  });

  const carrersAuthData = carrersAuthApiData?.data?.data?.result;

  const careersApiData = useQuery({
      queryKey : ['careersApiData'],
      queryFn : () => getCarrersApi(``),
      enabled: profileData?.role?.name === "ADMIN"
    })
  
    const careersData = careersApiData?.data?.data?.result?.rows

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

      const totalPages = careersApiData?.data?.data?.result?.pagination?.pages;

      const handlePageChange = (page) => {
          setCurrentPage(page);
      }

      // delete career
      const handleDelete = async (id)=> {

        try{
          setLoading(true)
          const deleteApi = await deleteCareersApi(id)
        if (deleteApi?.status === 200) {
                    toast.success(deleteApi?.data?.msg)
                    careersApiData?.refetch()
         }
        }catch(err){
          console.log(err)         
        }finally{
          setLoading(false)
        }
      }
  

  return (
    <>
    {profileData?.role?.name === "ADMIN" ? (
    <div className="main-div">
             <div className="header-section">
               <p className="fw-medium fs-4">Careers Data</p>
               <button className="btn btn-light"
               onClick={()=>{setOpenModal(true),setModalType('create'),setModalId('')}} >
               <IoAddSharp /> Create
               </button>
               {/* <button className="download-btn ">
         Download Data
       </button> */}
   
             </div>
             {careersData?.length > 0 ? (
             <div className="table-div">
               <table class="table table-striped">
                 <thead>
                   <tr>
                     <th scope="col">S.No</th>
                     <th scope="col">Name</th>
                     <th scope="col">Experience</th>
                     <th scope="col">Applications</th>
                     <th scope="col">Date</th>
                     <th scope="col">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                 {careersData?.map((item,index) => (
                     <tr key={index}>
                     <th scope="row">{index + 1}</th>
                     <td>{item?.name ? item?.name : "-"}</td>
                     <td>
                        {item?.experience === '0'
                        ? "Fresher"
                        : `${item?.experience} year${item?.experience > 1 ? "s" : ""}`}
                        </td>
                     <td>{item?.totalApplications}</td> 
                     <td>{isFormatDate(item?.createdAt)}</td>                                   
                     <td className="">
                       <button className="btn btn-info"
                       onClick={()=>navigate(`/careers/${item?._id}`)}><IoMdEye size={20}/></button>
                       <button className="btn btn-warning ms-3" 
                       onClick={()=>{setOpenModal(true),setModalType('update'),setModalId(item)}}><MdEdit size={20}/></button>
                       <button className="btn btn-danger ms-3" 
                       onClick={()=>handleDelete(item?._id)}><MdDeleteOutline size={20}/></button>
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
    ) : (
      <div className="heading-custom">
            <div className="banner-section">
              {loader && !error && (
                <div className="loader">
                  <div className={imageStyles?.loader}></div>
                </div>
              )}
              <img
                src={ServicesBannerImg}
                className={`${loader || error ? "hidden" : ""}`}
                onLoad={() => setLoader(false)}
                onError={() => {
                  setLoader(false);
                  setError(true);
                }}
              />
              <div className="black-screen">
                <div className="black-screen-content">
                  <h1>Careers</h1>
                  <p>
                    Gain hands-on experience in software development, cybersecurity,
                    cloud computing, and IT support to build practical skills for a
                    successful tech career.
                  </p>
                </div>
              </div>
            </div>
            <div className="cards-main-div">
              {carrersAuthData?.rows?.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-4 g-4">
                  {carrersAuthData?.rows?.map((item,index) => (
                      <div className="col" key={index}>
                      <div className="card h-100">
                        <img src={item?.img_url} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{item?.name}</h5>
                          <div className="card-minheading-one mt-3">
                              <p className="">Experience</p>
                              <h6 className=" mx-2"> <span className="me-3">:</span> {item?.experience}</h6>
                          </div>
                          <div className="card-minheading-two">
                              <p className="">Location </p>
                              <h6 className=" mx-4"> <span className="me-3">:</span> {item?.location}</h6>
                          </div>
                          <p className="card-text-link"
                          onClick={()=>navigate(`/careers/${item?._id}`)}>
                            Job Description
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              ) : (
                <div>
                <NoDataFound/>
                </div>
              )}
            </div>
            <Footer />
          </div>
    )}
{openModal && (
    <CareersCreateModal open={openModal} handleModal={()=>setOpenModal(!openModal)} refetch={()=>careersApiData?.refetch()} 
    modalType={modalType}
     modalId={modalId}
    />
  )}
      {(carrersAuthApiData?.isLoading || careersApiData?.isLoading || loading) && <LoaderPage/>}
    </>
    
  );
};

export default CarrersPage;
