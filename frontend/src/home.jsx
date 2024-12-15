import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import cblogo from "./cblogo.PNG";
import image from "./Bg.png";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import axios from "axios"; // Import axios here

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(common.white),
        backgroundColor: common.white,
        '&:hover': {
            backgroundColor: '#ffffff7a',
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    googleTranslate: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        borderRadius: "15px",
        color: "#000000a6",
        fontSize: "20px",
        fontWeight: 900,
        zIndex: 1000,
    },
    clearButton: {
        width: "-webkit-fill-available",
        borderRadius: "15px",
        padding: "15px 22px",
        color: "#000000a6",
        fontSize: "20px",
        fontWeight: 900,
    },
    root: {
        maxWidth: 345,
        flexGrow: 1,
    },
    media: {
        height: 400,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    gridContainer: {
        justifyContent: "center",
        padding: "4em 1em 0 1em",
    },
    mainContainer: {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: "93vh",
        marginTop: "8px",
    },
    imageCard: {
        margin: "auto",
        maxWidth: 400,
        height: 500,
        backgroundColor: 'transparent',
        boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
        borderRadius: '15px',
    },
    imageCardEmpty: {
        height: 'auto',
    },
    noImage: {
        margin: "auto",
        width: 400,
        height: "400 !important",
    },
    input: {
        display: 'none',
    },
    uploadIcon: {
        background: 'white',
    },
    tableContainer: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important',
    },
    table: {
        backgroundColor: 'transparent !important',
    },
    tableHead: {
        backgroundColor: 'transparent !important',
    },
    tableRow: {
        backgroundColor: 'transparent !important',
    },
    tableCell: {
        fontSize: '22px',
        backgroundColor: 'transparent !important',
        borderColor: 'transparent !important',
        color: '#000000a6 !important',
        fontWeight: 'bolder',
        padding: '1px 24px 1px 16px',
    },
    tableCell1: {
        fontSize: '14px',
        backgroundColor: 'transparent !important',
        borderColor: 'transparent !important',
        color: '#000000a6 !important',
        fontWeight: 'bolder',
        padding: '1px 24px 1px 16px',
    },
    tableBody: {
        backgroundColor: 'transparent !important',
    },
    text: {
        color: 'white !important',
        textAlign: 'center',
    },
    buttonGrid: {
        maxWidth: "416px",
        width: "100%",
    },
    detail: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    appbar: {
        background: '#113226',
        boxShadow: 'none',
        color: 'white',
    },
    loader: {
        color: '#be6a77 !important',
    }
}));

const ImageUpload = () => {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [data, setData] = useState();
    const [image, setImage] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    let confidence = 0;

    const sendFile = async () => {
        if (image) {
            let formData = new FormData();
            formData.append("file", selectedFile);
    
            try {
                let res = await axios({
                    method: "post",
                    url: import.meta.env.VITE_API_URL, // Use import.meta.env instead of process.env
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data' // Set content type
                    }
                });
    
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Error uploading file:", error);
            } finally {
                setIsloading(false); // Make sure to set loading state in finally block
            }
        }
    };

    const clearData = () => {
        setData(null);
        setImage(false);
        setSelectedFile(null);
        setPreview(null);
    };

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    }, [selectedFile]);

    useEffect(() => {
        if (!preview) {
            return;
        }
        setIsloading(true);
        sendFile();
    }, [preview]);

    const onSelectFile = (files) => {
        if (!files || files.length === 0) {
            setSelectedFile(undefined);
            setImage(false);
            setData(undefined);
            return;
        }
        setSelectedFile(files[0]);
        setData(undefined);
        setImage(true);
    };

    if (data) {
        confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    }

    return (
        <React.Fragment>
            <div id="google_translate_element" className={classes.googleTranslate}></div>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Farmer's delight :Potato Disease Detection Using Convolutional Neural Network
                    </Typography>
                    <div className={classes.grow} />
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
                <Grid
                    className={classes.gridContainer}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {/* Left side: Dropzone */}
<Grid item xs={12} md={4}>
    <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
        {!image && <CardContent className={classes.content}>
            <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
                onChange={onSelectFile}
            />
        </CardContent>}
        {image && <CardActionArea>
            <CardMedia
                className={classes.media}
                image={preview}
                component="img"
                title="Uploaded Image"
            />
        </CardActionArea>}
        {isLoading && <CardContent className={classes.detail}>
            <CircularProgress color="secondary" className={classes.loader} />
            <Typography className={classes.title} variant="h6" noWrap>
                Processing
            </Typography>
        </CardContent>}
        {/* Display label and confidence score after image is processed */}
        {data && !isLoading && (
    <CardContent className={classes.detail}>
        {confidence >= 85 ? (
    <>
        <Typography variant="h6" style={{ color: "black" }} gutterBottom>
            Disease Identified: <strong>{data.class}</strong>
        </Typography>
        <Typography variant="body1" style={{ color: "black" }}>
            Confidence: {confidence}%
        </Typography>
    </>
        ) : (
            <Typography variant="h6" color="textSecondary" gutterBottom>
                Invalid Image
            </Typography>
        )}
    </CardContent>
)}

    </Card>
</Grid>

                    {/* Right side: Prevention and Remedy Cards */}
                    {data && confidence >= 85 && (
                        <>
                            <Grid item xs={12} md={4}>
                                <Card className={classes.imageCard}>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>
                                            Prevention
                                        </Typography>
                                        <Typography>
                                            {data.class === "Early Blight" && "To prevent early blight in potatoes, practice crop rotation to reduce disease buildup and choose resistant potato varieties when available. Plant with proper spacing to allow good airflow, reducing moisture on leaves, and water only at the base of plants to keep foliage dry. Regularly prune lower leaves to avoid soil splashes, and maintain good field hygiene by removing plant debris at the end of the season to minimize fungal spores."}
                                            {data.class === "Late Blight" && "To prevent late blight, use certified disease-free seed potatoes and plant resistant varieties whenever possible. Apply preventive fungicides early in the season, especially in cool, damp conditions that favor blight, and space plants well to promote airflow. Avoid overhead watering and ensure good drainage to reduce leaf wetness. Practice good field hygiene by removing any infected plants or debris after harvest to limit overwintering spores."}
                                            {data.class === "Healthy" && "Keep monitoring your crops."}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card className={classes.imageCard}>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>
                                            Remedy
                                        </Typography>
                                        <Typography>
                                            {data.class === "Early Blight" && "If early blight appears, apply fungicides like chlorothalonil or copper-based treatments to manage the infection. Remove and dispose of infected leaves immediately to reduce spread, and add mulch around plants to limit spore splashing from soil to leaves. Continue monitoring plants and reapply fungicides as needed to protect healthy foliage."}
                                            {data.class === "Late Blight" && "If late blight appears, immediately treat with intensive fungicides such as mancozeb or phosphorous acid to control the spread. Promptly remove and destroy any infected plants to prevent the disease from spreading further. Closely monitor nearby plants, treating them preventively with fungicides, and ensure that infected plant material is carefully disposed of away from the growing area."}
                                            {data.class === "Healthy" && "Maintain good crop care practices."}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </>
                    )}

                    {/* Clear Button */}
                    {data && <Grid item className={classes.buttonGrid}>
                        <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                            Clear
                        </ColorButton>
                    </Grid>}
                </Grid>
            </Container>
        </React.Fragment>
    );
};
export default ImageUpload;




















// import { useState, useEffect } from "react";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Avatar from "@material-ui/core/Avatar";
// import Container from "@material-ui/core/Container";
// import React from "react";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
// import cblogo from "./cblogo.PNG";
// import image from "./bg.png";
// import { DropzoneArea } from 'material-ui-dropzone';
// import { common } from '@material-ui/core/colors';
// import Clear from '@material-ui/icons/Clear';
// import axios from "axios"; // Import axios here

// const ColorButton = withStyles((theme) => ({
//     root: {
//         color: theme.palette.getContrastText(common.white),
//         backgroundColor: common.white,
//         '&:hover': {
//             backgroundColor: '#ffffff7a',
//         },
//     },
// }))(Button);

// // const axios = require("axios").default;

// const useStyles = makeStyles((theme) => ({
//     grow: {
//         flexGrow: 1,
//     },
//     clearButton: {
//         width: "-webkit-fill-available",
//         borderRadius: "15px",
//         padding: "15px 22px",
//         color: "#000000a6",
//         fontSize: "20px",
//         fontWeight: 900,
//     },
//     root: {
//         maxWidth: 345,
//         flexGrow: 1,
//     },
//     media: {
//         height: 400,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         margin: 'auto',
//         maxWidth: 500,
//     },
//     gridContainer: {
//         justifyContent: "center",
//         padding: "4em 1em 0 1em",
//     },
//     mainContainer: {
//         backgroundImage: `url(${image})`,
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         backgroundSize: 'cover',
//         height: "93vh",
//         marginTop: "8px",
//     },
//     imageCard: {
//         margin: "auto",
//         maxWidth: 400,
//         height: 500,
//         backgroundColor: 'transparent',
//         boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
//         borderRadius: '15px',
//     },
//     imageCardEmpty: {
//         height: 'auto',
//     },
//     noImage: {
//         margin: "auto",
//         width: 400,
//         height: "400 !important",
//     },
//     input: {
//         display: 'none',
//     },
//     uploadIcon: {
//         background: 'white',
//     },
//     tableContainer: {
//         backgroundColor: 'transparent !important',
//         boxShadow: 'none !important',
//     },
//     table: {
//         backgroundColor: 'transparent !important',
//     },
//     tableHead: {
//         backgroundColor: 'transparent !important',
//     },
//     tableRow: {
//         backgroundColor: 'transparent !important',
//     },
//     tableCell: {
//         fontSize: '22px',
//         backgroundColor: 'transparent !important',
//         borderColor: 'transparent !important',
//         color: '#000000a6 !important',
//         fontWeight: 'bolder',
//         padding: '1px 24px 1px 16px',
//     },
//     tableCell1: {
//         fontSize: '14px',
//         backgroundColor: 'transparent !important',
//         borderColor: 'transparent !important',
//         color: '#000000a6 !important',
//         fontWeight: 'bolder',
//         padding: '1px 24px 1px 16px',
//     },
//     tableBody: {
//         backgroundColor: 'transparent !important',
//     },
//     text: {
//         color: 'white !important',
//         textAlign: 'center',
//     },
//     buttonGrid: {
//         maxWidth: "416px",
//         width: "100%",
//     },
//     detail: {
//         backgroundColor: 'white',
//         display: 'flex',
//         justifyContent: 'center',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     appbar: {
//         background: '#be6a77',
//         boxShadow: 'none',
//         color: 'white',
//     },
//     loader: {
//         color: '#be6a77 !important',
//     }
// }));

// export const ImageUpload = () => {
//     const classes = useStyles();
//     const [selectedFile, setSelectedFile] = useState();
//     const [preview, setPreview] = useState();
//     const [data, setData] = useState();
//     const [image, setImage] = useState(false);
//     const [isLoading, setIsloading] = useState(false);
//     let confidence = 0;

//     const sendFile = async () => {
//         if (image) {
//             let formData = new FormData();
//             formData.append("file", selectedFile);
    
//             try {
//                 let res = await axios({
//                     method: "post",
//                     url: import.meta.env.VITE_API_URL, // Use import.meta.env instead of process.env
//                     data: formData,
//                     headers: {
//                         'Content-Type': 'multipart/form-data' // Set content type
//                     }
//                 });
    
//                 if (res.status === 200) {
//                     setData(res.data);
//                 }
//             } catch (error) {
//                 console.error("Error uploading file:", error);
//             } finally {
//                 setIsloading(false); // Make sure to set loading state in finally block
//             }
//         }
//     };

//     const clearData = () => {
//         setData(null);
//         setImage(false);
//         setSelectedFile(null);
//         setPreview(null);
//     };

//     useEffect(() => {
//         if (!selectedFile) {
//             setPreview(undefined);
//             return;
//         }
//         const objectUrl = URL.createObjectURL(selectedFile);
//         setPreview(objectUrl);
//     }, [selectedFile]);

//     useEffect(() => {
//         if (!preview) {
//             return;
//         }
//         setIsloading(true);
//         sendFile();
//     }, [preview]);

//     const onSelectFile = (files) => {
//         if (!files || files.length === 0) {
//             setSelectedFile(undefined);
//             setImage(false);
//             setData(undefined);
//             return;
//         }
//         setSelectedFile(files[0]);
//         setData(undefined);
//         setImage(true);
//     };

//     if (data) {
//         confidence = (parseFloat(data.confidence) * 100).toFixed(2);
//     }

//     return (
//         <React.Fragment>
//             <AppBar position="static" className={classes.appbar}>
//                 <Toolbar>
//                     <Typography className={classes.title} variant="h6" noWrap>
//                         Farmer's delight :Potato Disease Classification Using Image Processing
//                     </Typography>
//                     <div className={classes.grow} />
//                     {/* <Avatar src={cblogo}></Avatar> */}
//                 </Toolbar>
//             </AppBar>
//             <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>
//                 <Grid
//                     className={classes.gridContainer}
//                     container
//                     direction="row"
//                     justifyContent="center"
//                     alignItems="center"
//                     spacing={2}
//                 >
//                     <Grid item xs={12}>
//                         <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
//                             {image && <CardActionArea>
//                                 <CardMedia
//                                     className={classes.media}
//                                     image={preview}
//                                     component="img"
//                                     title="Contemplative Reptile"
//                                 />
//                             </CardActionArea>}
//                             {!image && <CardContent className={classes.content}>
//                                 <DropzoneArea
//                                     acceptedFiles={['image/*']}
//                                     dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
//                                     onChange={onSelectFile}
//                                 />
//                             </CardContent>}
//                             {data && (
//     <CardContent className={classes.detail}>
//         <TableContainer component={Paper} className={classes.tableContainer}>
//             <Table className={classes.table} size="small" aria-label="simple table">
//                 <TableHead className={classes.tableHead}>
//                     <TableRow className={classes.tableRow}>
//                         <TableCell className={classes.tableCell1}>Label:</TableCell>
//                         <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody className={classes.tableBody}>
//                     <TableRow className={classes.tableRow}>
//                         <TableCell component="th" scope="row" className={classes.tableCell}>
//                             {confidence >= 85 ? data.class : "Enter a valid image"}
//                         </TableCell>
//                         <TableCell align="right" className={classes.tableCell}>
//                             {confidence >= 85 ? `${confidence}%` : ""}
//                         </TableCell>
//                     </TableRow>
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     </CardContent>
// )}

//                             {isLoading && <CardContent className={classes.detail}>
//                                 <CircularProgress color="secondary" className={classes.loader} />
//                                 <Typography className={classes.title} variant="h6" noWrap>
//                                     Processing
//                                 </Typography>
//                             </CardContent>}
//                         </Card>
//                     </Grid>
//                     {data && <Grid item className={classes.buttonGrid}>
//                         <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
//                             Clear
//                         </ColorButton>
//                     </Grid>}
//                 </Grid>
//             </Container>
//         </React.Fragment>
//     );
// }; 