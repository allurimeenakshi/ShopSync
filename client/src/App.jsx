import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import Home from './components/home/Home'
import Grocery from './components/grocery/Grocery'
import RoutingError from './components/RoutingError'
import Clothing from './components/clothing/Clothing'
import Sports from './components/sports/Sports'
import HomeApp from './components/homeApp/HomeApp'
import KnowMore from './components/knowmore/KnowMore'
import Recipes from './components/recipes/Recipes'
import OutfitRecommender from './components/outfits/OutfitRecommender'
import Location from './components/location/Location'
import Calorie from './components/calorie/Calorie'
import Chatbot from './components/chatbot/Chatbot'  
import './App.css'


function App() {
  const browserRouter = createBrowserRouter([
    {
      path : '',
      element : <RootLayout />,
      errorElement : <RoutingError />,
      children  : [
        {
          path : '',
          element : <Home/>
        },
        {
          path : 'grocery',
          element : <Grocery/>
        },{
          path : 'clothing',
          element : <Clothing/>
        },{
          path : 'sports',
          element : <Sports/>
        },{
            path : 'homeApp',
            element : <HomeApp/>,
        }, 
        
        {
          path : 'recipes',
          element : <Recipes />
        },
        {
          path : 'knowmore',
          element : <KnowMore />
        },
  
        {
          path : 'location',
          element : <Location />
        },
        {
          path : 'outfits',
          element : <OutfitRecommender />
        },
        {
          path : 'calorie',
          element : <Calorie />
        },
        {
          path : 'chatbot',
          element : <Chatbot />
        }
      ]
    }
  ])
  return (
    <div >
      <RouterProvider router = {browserRouter} />
    </div>
  )
}

export default App
