# React framework Note

[Github](https://github.com/ClydeRM/React-practice-2021)
##    Start Project
```
npx create-react-app <project name>
```

##    專案檔案結構
```
.
├── build // npm run build產生，是真正要發布的專案
    
├── public // index.html/Icon/圖案的資料夾
    └── index.html // 根頁面/Title/Icon/引入CDN
├── src 
    ├── components // 頁面中的各區塊
        ├── Header.js  
        ├── Body.js 
        ├── Footer.js 
        ├── About.js 
    ├── App.js // 程式進入點，設計Body的Layout/連接APi
    ├── index.js // 初始檔案
    ├── reportWebVitals.js // 初始檔案
    └── index.css // 主要的客製化設計參數
├── package.json
├── package-lock.json
├── yarn.lock
```

## PropTypes

component的屬性設定

```
import PropTypes from 'prop-types'

Object.propTypes = {
    Attribute1: PropTypes.string, // 一定要是string 
    Attribute2: PropTypes.func, // 一定要是函式
    Attribute3: PropTypes.string.isRequired, // 一定要給初值
}

```

##   useState, useEffect
```
import { useState, useEffect } from 'react'

//   [stateObject, stateFunction] = stateObject(初始值)
const [showAddTask, setShowAddTask] = useState(false) 
const [tasks, setTasks] = useState([ ])	

// useEffect(function, functionProps) 
useEffect(() =>{ 
    const getTasks = async() => { 
        const taskFromServer = await fetchTasks()
        setTasks(taskFromServer)
    }
    getTasks()
}, [])

```

##    React html tag
html tag
* app.js 一定在 < div >中
* className = class
* < Header event={callFunction} />
* < Route /> 需要import react-route-dom
    * 需要設定根目錄 path='/' exact 
    * route path='/path...' component
* < Footer />
* {< component />} 可以為tag寫邏輯

```
import { BrowserRouter as Router, Route } from 'react-router-dom'


<Router>
    <div className="container">
        {/* <Header title='Hello' />  override default props.title */}
        {/* <Header title={'Task Tracker'}/>  using PropTypes expected var type*/}
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Route path='/' exact render={ () =>
            <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {
                    判斷式 > 0
                        ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                        : 'NO Task'
                }
            </>
        }/>
        <Route path='/about' component={About}/>
        <Footer />
    </div>
</Router>
```

##    Component 

* const Component({props....}) = >{
         return < attribute....> </>
}
```
const component = ({ color, text, onClick }) => {
    return <button
        onClick={onClick}
        style={{ background: color }}
        className='btn' >
        {text}
    </button>
}
```

##    快速生成
```
rafce+Tab  == 

import React from 'react'

const <fileName> = () => {
    return (
        <div>
            
        </div>
    )
}

export default <fileName>

```

##    專案發佈
* build folder 才是我們真正發佈的網站檔案
* Google React plugin Icon 紅色 未建置 藍色 已建置
```
npm run build >> build folder 


// serve 套件是一個小型的伺服器 用來測試build專案
sudo npm i -g serve


// 在 http://localhost:8000 上
serve -s build -p 8000 

```

##    Json-server
```
npm i json-server


>> package.json>>"scripts":{}

"server": "json-server --watch db.json --port 5000"

npm run server
```