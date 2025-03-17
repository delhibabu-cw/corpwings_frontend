import noDataImg from "../../img/NoDataFound/noData.jpg"
import "./NoDataFound.css"

function NoDataFound() {
  return (
    <div className='main-div'>
    <img src={noDataImg} className='' alt="No Image" />
    <p className='text-center mt-2 '>No Data Found</p>
</div>
  )
}

export default NoDataFound