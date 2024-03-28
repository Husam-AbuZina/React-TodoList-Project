import './App.css'
import TodoList from './Components/TodoList/TodoList';

function App() {
  const names = ['Carolien Bloeme', 'Song Bao', 'Bonginkosi Madladlana'];
  const nameschecked = ['Sun Jun', 'Olibia Arribas', 'Arina Belomestnykh', 'Jacqueline Likoki'];

  return (
    <>
    <div className='container'>
    <TodoList/>
    </div>
    </>
  )
}

export default App