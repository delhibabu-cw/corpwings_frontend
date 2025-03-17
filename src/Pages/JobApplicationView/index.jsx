import React, { useState } from 'react'
import "./JobApplicationView.css"
import { getJobApplicationApi } from '../../api-service/admin';
import { useQuery } from '@tanstack/react-query';
import { FaRegEye } from 'react-icons/fa6';
import DocumentViewer from '../../components/documentViewer';
import LoaderPage from '../../components/loaderPage';

const JobApplicationView = ({open, handleModal, modalId}) => {

    if (!open) return null;

    const [documentItem, setDocumentItem] = useState({});
      const [documentModal, setDocumentModal] = useState(false);

      const jobApplysApiData = useQuery({
        queryKey: ["jobApplysApiData", modalId],
        queryFn: () => getJobApplicationApi(`/${modalId}`),
      });
    
      const jobApplysData = jobApplysApiData?.data?.data?.result;

  return (
    <>
    <div className="overlay">
            <div className={`modal-content `}>
              <div className="modal-header">
                <h2 className="modal-title">Applicant Details</h2>
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
                    <h6 className='name-tag'>{jobApplysData?.fullName}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Email</p>
                        <p>:</p>
                    </div>
                    <h6>{jobApplysData?.email}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Mobile</p>
                        <p>:</p>
                    </div>
                    <h6>{jobApplysData?.mobile}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Gender</p>
                        <p>:</p>
                    </div>
                    <h6>{jobApplysData?.gender}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Year Of Graduation</p>
                        <p>:</p>
                    </div>
                    <h6>{jobApplysData?.yearOfGraduation}</h6>
                </div>
                <div className="one-div">
                <div className="second-div">
                    <p>Experience</p>
                    <p>:</p>
                </div>
                <h6>
                    {jobApplysData?.experience === 0
                    ? "Fresher"
                    : `${jobApplysData?.experience} year${jobApplysData?.experience > 1 ? "s" : ""}`}
                </h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Expected CTC</p>
                        <p>:</p>
                    </div>
                    <h6>{jobApplysData?.expectedCTC ? jobApplysData?.expectedCTC : "-"}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Notice Period</p>
                        <p>:</p>
                    </div>
                    <h6>{jobApplysData?.noticePeriod ? jobApplysData?.noticePeriod : "-"}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Current Location</p>
                        <p>:</p>
                    </div>
                    <h6>{jobApplysData?.currentLocation}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>About this vacancy</p>
                        <p>:</p>
                    </div>
                    <h6>{jobApplysData?.vacany ? jobApplysData?.vacany : "-"}</h6>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Skill's</p>
                        <p>:</p>
                    </div>
                    <div className='skill-div'>{jobApplysData?.skillSet?.map((idx,index) => (
                        <p key={index} className='btn btn-info'>{idx}</p>
                    ))}</div>
                </div>
                <div className='one-div'>
                    <div className='second-div'>
                        <p>Resume</p>
                        <p>:</p>
                    </div>
                     <button
                        onClick={() => {
                            setDocumentItem({
                                val: jobApplysData?.resume,
                                key: jobApplysData?.resume?.endsWith('.pdf') ? 'document' : 'image',
                                title: 'Resume'
                            });
                            setDocumentModal(true);
                        }}
                        className="btn btn-info"
                        >
                        {" "}
                        View <FaRegEye />
                        </button>
                </div>
              </div>
            </div>
          </div>
    
    <DocumentViewer
            open={documentModal}
            handleModal={() => setDocumentModal(!documentModal)}
            document={documentItem}
          />
          {(jobApplysApiData?.isLoading || jobApplysApiData?.isFetching) && <LoaderPage/>}
    </>
    
  )
}

export default JobApplicationView