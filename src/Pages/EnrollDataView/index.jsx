import React from 'react'
import "./EnrollDataView.css"
import { getUserApi } from '../../api-service/admin';
import { useQuery } from '@tanstack/react-query';
import { FaRegEye } from 'react-icons/fa6';
import LoaderPage from '../../components/loaderPage';

const EnrollDataView = ({open, handleModal, modalId}) => {

    if (!open) return null;

      const enrollApiData = useQuery({
        queryKey : ['enrollApiData', modalId],
        queryFn : () => getUserApi(`/${modalId}`)
      })
    
      const enrollData = enrollApiData?.data?.data?.result;

  return (
    <>
    <div className="overlay">
            <div className={`modal-content `}>
              <div className="modal-header">
                <h2 className="modal-title">User Details</h2>
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
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Name</p>
                        <p>:</p>
                    </div>
                    <h6 className='name-tag'>{enrollData?.fullName}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Email</p>
                        <p>:</p>
                    </div>
                    <h6>{enrollData?.email}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Mobile</p>
                        <p>:</p>
                    </div>
                    <h6>{enrollData?.mobile}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Gender</p>
                        <p>:</p>
                    </div>
                    <h6>{enrollData?.gender}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>College Name</p>
                        <p>:</p>
                    </div>
                    <h6>{enrollData?.collegeName}</h6>
                </div>
                <div className="one-div">
                <div className="second-div">
                    <p>Degree</p>
                    <p>:</p>
                </div>
                <h6>
                  {enrollData?.degree}
                </h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Location</p>
                        <p>:</p>
                    </div>
                    <h6>{enrollData?.location ? enrollData?.location : "-"}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Skills</p>
                        <p>:</p>
                    </div>
                    <h6>{enrollData?.skills ? enrollData?.skills : "-"}</h6>
                </div>
              </div>
            </div>
          </div>
    

          {(enrollApiData?.isLoading || enrollApiData?.isFetching) && <LoaderPage/>}
    </>
    
  )
}

export default EnrollDataView