import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import PressAbleButton from "../components/PressAbleButton";
import DataContext from "../../../../contexts/data-context";
import FlatListMaker from "./FlatListMaker";
import { Divider } from 'react-native-elements';



export default function HomeScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const dataCtx = React.useContext(DataContext);
    const [data, setData] = React.useState({foods:[],categories:[]});
    const isLoggedIn = dataCtx.isLoggedIn;

    const FetchData = async (url) => {
      try{
        const response = await fetch(url);
        const newdata = await response.json();
        setData(newdata.result);
     
        console.log(newdata);
      }
      catch (err) {
          console.log(err);
      }
    }

    useEffect(()=>{
        let clean=true; 
        console.log("HomeScreen useEffect");
        FetchData("http://192.168.0.105:5000/foods/all");
        return ()=>{
            clean=false;
            setData({foods:[],categories:[]});
        }
    },[isLoggedIn])

    const categoryChangeHandler = (item) => {
        if(item._id){
            setSelectedCategory(item._id);
        }
        else{
            setSelectedCategory(item.key);
        }
    }


const RenderCatagory = () =>{
       const All ={name:"All",key:"All"};
       const newCat = [All,...data.categories];
       return newCat.map((c,id) => (
            <PressAbleButton 
                key={c._id || c.key}
                buttonStyle={c._id === selectedCategory || c.key === selectedCategory ?  {...styles.btnStyle, backgroundColor: "#D3103E",
                color: "white",} : styles.btnStyle}
                title={c.name}
                onPress={()=>categoryChangeHandler(c)}
            />
        ));
    }

    const getData = (dataArray,cat)=>{
        let cataArray = [];
        if(selectedCategory === "All"){
            cataArray = cat;
        }
        else{
            cataArray = cat.filter(c => c._id === selectedCategory);
        }
        return cataArray.map((c) => {
            const newData = dataArray.filter((f) => f.category === c._id);
            return {
                title: c.name,
                data:newData
            };  
        }
        );
    
    }

const DATA= getData(data.foods,data.categories);

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={styles.pill}
            >
                <RenderCatagory />
            </ScrollView>
            <FlatListMaker data={DATA} navigation={navigation} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#EDF5FB",
        alignContent: "center",
    },
    title: {
        fontSize: 32,
    },
    pill: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 70,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    btnStyle: {
        color: "black",
        backgroundColor: "#E8D6DA",
        paddingHorizontal: 10,
        marginHorizontal: 3,
        minWidth: 110,
        borderRadius: 5,
        borderColor: "#EDF",
        borderWidth: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        backgroundColor: "#D3103E",
        color: "white",
    },
    btnTitle: {
        color: "#000",
    },
    activeText: {
        color: "#fff",
    },
   
});
