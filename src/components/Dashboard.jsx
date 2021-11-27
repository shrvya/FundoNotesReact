export default class UploadImage extends React.Component {

    triggerInputFile = () => {

        this.fileInput.click();
    }

    getImage = (event) => {

        this.props.getImage(event.target.files[0], this.props.noteSelected );
    }

    render() {
        return (
            <div>
                <img className="noteAddFeatureImages" src={require('../assets/images/imageAdd.svg')} alt="uploadImage" onClick={this.triggerInputFile} />
<input ref={fileInput => this.fileInput = fileInput} type="file" style={{ 'display': 'none' }} 
                onChange={this.getImage} name="image" />
            </div>
        )
    }
}
///=--------------color
const colorPaletteClassName = [
    {
        colorCode: "rgb(255, 255, 255)",
        colorName: "White"
    },
    {
        colorCode: "rgb(242, 139, 130)",
        colorName: "Red"
    },
    {
        colorCode: "rgb(215, 174, 251)",
        colorName: "Purple"
    },
    {
        colorCode: "rgb(255, 192, 203)",
        colorName: "Pink"
    },

{
        colorCode: "rgb(167, 255, 235)",
        colorName: "Teal"
    },
    {
        colorCode: "rgb(251, 188, 4)",
        colorName: "Orange"
    },
    {
        colorCode: "rgb(174, 203, 250)",
        colorName: "Dark Blue"
    }
    ///=====================
   
// Hoc


//  Refs
//  Dom
// optimizing performance
// static type checking And strict Mode
// Context

// api refernce
// React Dom
// Dom elements
// React Components