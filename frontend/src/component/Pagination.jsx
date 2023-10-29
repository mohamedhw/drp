import {connect} from 'react-redux'
import { setPage, setCurrentPage } from '../redux/action/pages'; // Import your new actions
import { useNavigate } from 'react-router-dom';



const Pagination = ({previous, next, setPage, currentPage, setCurrentPage, count}) => {
  const navigate = useNavigate()

  
  const handelFirstPage = () => {
    setCurrentPage(1)
    navigate('/')
  }
  
  const handePageNumber = (index) => {
    setCurrentPage(index+1)
    navigate(currentPage)
  }

  const handelPreviousPage = () => {
    try{
      setCurrentPage(parseInt(previous.match(/page=(\d+)/)[1]))
    }catch{
      handelFirstPage()
    }

  }
  const numberOfPages = Math.ceil(count / 12)

  const itemsToRender = Array(numberOfPages).fill(null);
    return (
      <>
        <nav className="Page navigation example mt-5" style={{paddingBottom: "80px"}}>
          <ul className="pagination pg-blue justify-content-center">

            {numberOfPages && numberOfPages?
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
                    <li className="page-item">
                      <a key={index} className="btn btn-success btn-sm mb-4 pg-lin btn-s" onClick={e=> handePageNumber(index)}>{ index + 1 }</a>
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
      </>

    )
}

const mapStateToProps = state => ({
  next: state.pics.pics.next,
  previous: state.pics.pics.previous,
  count: state.pics.pics.count,
  currentPage: state.pages.currentPage,
})
export default connect(mapStateToProps, {setCurrentPage}) (Pagination)
