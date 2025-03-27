import './index.css'

const HomeFailuar = props => {
  const {getData} = props
  return (
    <div className="home-failuar-container">
      <img
        className="failuar-img"
        src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1740982653/Icon_oxsmym.png"
        alt="failure view"
      />
      <p className="failuar-text">Something went wrong. Please try again</p>
      <button
        type="button"
        onClick={() => getData()}
        className="failuar-button"
      >
        Try Again
      </button>
    </div>
  )
}

export default HomeFailuar
