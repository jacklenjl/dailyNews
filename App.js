/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import HelloWorldApp from './helloWorld'
import HeaderView from './header'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tab'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  StatusBar,
  Modal,
  Alert
} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
function HomeScreen({ navigation }) {
  const[Apititle,setTitle]=React.useState(false)
  const[modalVal,setModalVal]=React.useState(false)
  const[currentStory,setCurrentStoryVal]=React.useState(false)

  let arryCards=[]
  // let modalVisible=false

  fetch('https://newsapi.org/v2/top-headlines?apiKey=e6c5b8c7e91448f899fe02fb6c0601b9&country=in&page=1&category=science')
  .then((response) => response.json())
  .then((responseJson) => {console.log(
    Object.keys(responseJson))
    responseJson.articles.map((item,index)=>{
      arryCards.push(<Card  key={index}>
          <CardImage 
            source={{uri: item.urlToImage}} 
            title={item.title}
          />
          {/* <CardTitle
            subtitle={item.title}
          /> */}
          <CardContent text={item.description} />
          <CardAction 
            separator={true} 
            inColumn={false}>
            <CardButton
              onPress={() => {
                setModalVal(true)
                setCurrentStoryVal(item)
              }}
              title="Share"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {}}
              title="Explore"
              color="#FEB557"
            />
          </CardAction>
        </Card>)

    })
    setTitle(arryCards)
    
    // setTitle(responseJson.ad.text)
  }).catch((error)=>{
    throw error;
  })

  
  
  
 
  

  return (
<>
    <SafeAreaView>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginVertical: 25, }}>
        <HeaderView/>
      </View>
    {/* <View>
    {Apititle}
    </View> */}
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {Apititle}

    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVal(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
            <Card style={{padding:15}}>
            <CardImage 
            source={{uri: currentStory.urlToImage}} 
            title={currentStory.title}
          />
          </Card>
          </View>
          <View>
          <Text style={{top:170,left:35}}>Author: {currentStory.author}</Text>
          <Text style={{top:150,padding:28}}>
            {currentStory.description}
          </Text>
          
          
            </View>
            
          </View>
        </View>
      </Modal>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
    </ScrollView>
      </SafeAreaView>
      </>
  );
}
function DetailsScreen({ navigation }) {
    return ( 
   <>
      <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
    </ScrollView>
      </SafeAreaView>
      </>
    );
  
    
  
}

function ContractsScreen({navigation})
{
  return ( 
   
    <SafeAreaView>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Contracts Screen</Text>
    <Button
      title="Go to Details... again"
      onPress={() => navigation.goBack()}
    />
   </View>
  </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();
const App = () => {

  
  return (
    <NavigationContainer>
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ?  "truck"
                  : "truck-outline"
              } else if (route.name === 'Details') {
                iconName = focused ? 'truck-trailer' : 'truck-trailer';
              }
              else if (route.name === 'Contracts') {
                iconName = focused ? 'file-document' : 'file-document-outline';
              }
  
              // You can return any component that you like here!
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#1c5698",
            inactiveTintColor: 'gray',
          }}
      >
      <Tab.Screen name="Home" component={HomeScreen}  />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Contracts" component={ContractsScreen} />
    </Tab.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine2:
  { 
    position: 'absolute',
    // width: 5,
    // height: 5,
    right:0,
    bottom: 0,
    
  },

  engine: {
     position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
