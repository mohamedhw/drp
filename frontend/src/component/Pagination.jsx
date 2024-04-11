import { connect } from 'react-redux'
import { setCurrentPage } from '../redux/action/pages';



const Pagination = ({ previous, next, currentPage, setCurrentPage, count }) => {

    const handelFirstPage = () => {
        setCurrentPage(1)
    }

    const handelPageNumber = (index) => {
        setCurrentPage(index + 1)
    }

    const handelPreviousPage = () => {
        try {
            setCurrentPage(parseInt(previous.match(/page=(\d+)/)[1]))
        } catch {
            handelFirstPage()
        }
    }

    const handelNextPage = () => {
        try {
            setCurrentPage(parseInt(next.match(/page=(\d+)/)[1]))
        } catch {
            handelFirstPage()
        }
    }

    const numberOfPages = Math.ceil(count / 24)
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 24));
    let endPage = Math.min(startPage + maxPagesToShow - 1, numberOfPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pagesToRender = Array(endPage - startPage + 1)
        .fill(null)
        .map((_, index) => startPage + index);

    return (
        <>
            {count > 24 ?
                <nav className="Page navigation example mt-5" style={{ paddingBottom: "80px" }}>
                    <ul className="pagination pg-blue justify-content-center">

                        {numberOfPages ?
                            <ul className="pagination pg-blue">
                                {previous ?
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
                                    : <></>
                                }

                                {pagesToRender.map((pageNumber) => (
                                    <li key={pageNumber - 1} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                                        <a className="btn btn-success btn-sm mb-4 pg-lin btn-s" onClick={() => handelPageNumber(pageNumber - 1)}>
                                            {pageNumber}
                                        </a>
                                    </li>
                                ))}

                                {next ?
                                    <>
                                        <li className="page-item">
                                            <a className="btn btn-outline-success btn-sm mb-4 pg-lin btn-s" onClick={() => handelNextPage()}>Next</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="btn btn-outline-success btn-sm mb-4 pg-lin btn-s" onClick={() => setCurrentPage(numberOfPages)}>&raquo;</a>
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
                </nav >
                : <div className='m-5'></div>
            }
        </>

    )
}


const mapStateToProps = state => ({
    currentPage: state.pages.currentPage,
    count: state.pics.pics.count,
    next: state.pics.pics.next,
    previous: state.pics.pics.previous,
})
export default connect(mapStateToProps, { setCurrentPage })(Pagination)
