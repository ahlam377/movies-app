import react from "react";
import { useState } from "react";
import styled,{ThemeProvider} from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../../themes";
import {MdOutlineLightMode} from "react-icons/md";

const styledApp = styled.div`
color : ${(props) => props.theme.fontColor}
`;

function Themes(){
    const [theme, setTheme] = useState ("light");
    const themeToggler = () =>{
        theme === "light"? setTheme("dark") : setTheme("light");
    };
    return(
        <ThemeProvider theme={theme === "light"? lightTheme :darkTheme}>
        <GlobalStyles/>
        <styledApp>
        <MdOutlineLightMode onClick ={()=> themeToggler()} fontSize={30} color={"white"}/>
        </styledApp>
        </ThemeProvider>
    )
}
export default Themes;