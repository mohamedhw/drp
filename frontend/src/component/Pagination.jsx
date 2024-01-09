import {connect} from 'react-redux'
import { setCurrentPage } from '../redux/action/pages'; // Import your new actions
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom"



const Pagination = ({previous, next, currentPage, setCurrentPage, count}) => {
  const navigate = useNavigate()
  const { username } = useParams();

  const handelFirstPage = () => {
    setCurrentPage(1)
    {username?
      navigate(`/userpics/${username}/`)
      :
      navigate('/')
    }
  }
  
  const handePageNumber = (index) => {
    setCurrentPage(index+1)
    {username?
      navigate(`/userpics/${username}/${currentPage}`)
      :
      navigate(currentPage)
    }
  }

  const handelPreviousPage = () => {
    try{
      setCurrentPage(parseInt(previous.match(/page=(\d+)/)[1]))
    }catch{
      handelFirstPage()
    }
  }
  const numberOfPages = Math.ceil(count / 24)

  const itemsToRender = Array(numberOfPages).fill(null);

    return (
      <>
        {count > 24 ?
        <nav className="Page navigation example mt-5" style={{paddingBottom: "80px"}}>
          <ul className="pagination pg-blue justify-content-center">

            {numberOfPages?
              <ul className="pagination pg-blue">
                {previous?
                  <>
                    <li className="page-item">
                      <a className="btn btn-outline-success btn-sm mb-4 pg-lin btn-s" onClick={e => handelFirstPage()}>
                        <span>&laquo;</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="btn btn-outline-success btn-sm mb-4 pg-lin btn-s" onClick={e => handelPreviousPage()}>Previous</a>
                    </li>
                  </>
                  :<></>
                }

                {itemsToRender.map((_, index) => (
                    <li key={index} className="page-item">
                      <a className="btn btn-success btn-sm mb-4 pg-lin btn-s" onClick={e=> handePageNumber(index)}>{ index + 1 }</a>
                    </li>                    
                  )
                )}

                {next?
                  <>
                    <li className="page-item">
                      <a className="btn btn-outline-success btn-sm mb-4 pg-lin btn-s" onClick={e => setCurrentPage(parseInt(next.match(/page=(\d+)/)[1]))}>Next</a>
                    </li>
                    <li className="page-item">
                      <a className="btn btn-outline-success btn-sm mb-4 pg-lin btn-s" onClick={e=> setCurrentPage(numberOfPages)}>&raquo;</a>
                    </li>
                  </>
                  :
                  <></>
                }

              </ul>
              :
              <></>
            }
          </ul>
        </nav>
        :<></>
          }
      </>

    )
}


export default connect(null, {setCurrentPage}) (Pagination)
