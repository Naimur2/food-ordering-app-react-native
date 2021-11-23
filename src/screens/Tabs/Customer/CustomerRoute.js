import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  React,{useContext,useEffect} from "react";
import { Icon } from "react-native-elements";
import HomeStackScreen from "./HomeTab/HomeStackScreen";
import SettingsStackScreen from "./SettingsTab/SettingsStactScreen";
import CartStackScreen from "./CartTab/CartStackScreen";
import SearchStackScreen from "./SearchTab/SearchStackScreen";
import DataContext from "../../../contexts/data-context";
import CustomerContext from "../../../contexts/customer-context";

const RenderIcon = ({ name, color }) => (
    <Icon name={name} type="ionicon" color="#517fa4" />
);

const Tab = createBottomTabNavigator();

export default function CustomerRoute() {
    const dataCtx = useContext(DataContext);
    const customerCtx = useContext(CustomerContext);
    const isLoggedIn = dataCtx.isLoggedIn;
    const user = dataCtx.user;
    
    useEffect(() => {
        let clean = true;
        if (isLoggedIn && clean && user.role==="customer") {
            customerCtx.addData();
        }
        return () => {
            clean = false;
        };
    }, [isLoggedIn,user]);



    return (
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Settings") {
                            iconName = focused
                                ? "settings"
                                : "settings-outline";
                        }
                         else if (route.name === "Cart") {
                            iconName = focused
                                ? "basket"
                                : "basket-outline";
                        }
                         else if (route.name === "Search") {
                            iconName = focused
                                ? "search"
                                : "search-outline";
                        }
                        return <RenderIcon name={iconName} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeStackScreen} />
                {/* <Tab.Screen name="Search" component={SearchStackScreen} /> */}
                <Tab.Screen name="Cart" component={CartStackScreen} />
                <Tab.Screen name="Settings" component={SettingsStackScreen} />
            </Tab.Navigator>
    );
}
