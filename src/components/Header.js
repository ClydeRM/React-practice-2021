import PropTypes from 'prop-types' // impt+table auto create
import Button from './Button'

const Header = ({ title }) => {

    const onClick = (e) =>{
        console.log(e)
    }

    return (
        <header className='header'>
            {/* <h1 style={ headingStyle }>{title}</h1> Can using stylesheet but is camoCase */}
            <h1>{title}</h1>
            <Button color='green' text='Add' onClick={onClick} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header
