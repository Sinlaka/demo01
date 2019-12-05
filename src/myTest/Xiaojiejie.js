import React, { Component, Fragment } from 'react'
// const Component = React.Component
import XiaojiejieItem from './XiaojiejieItem'
import Boss from './Boss'
import axios from 'axios'
import { CSSTransition,TransitionGroup } from 'react-transition-group'


import './style.css'

class Xiaojiejie extends Component {
    //tip:constructor是es6的构造函数，不是生命周期函数
    //React的Initialization阶段，定义属性（props）和状态(state)
    constructor(props) {
        super(props)//tip:调用父类的构造函数，固定写法
        this.state = {
            inputValue: 'ff',
            avname: '波多野结衣',
            list: ['基础按摩', '精油推背']
        }
    }

    componentDidMount() {
        axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda').then((res) => {
            console.log('请求成功' + res)
        }).catch((err) => {
            console.log('获取数据失败' + err)
        }).finally()
    }

    // //componentWillMount和componentDidMount这两个生命周期函数，只在页面刷新时执行一次
    // componentWillMount() {
    //     console.log('componentWillMount----组件将要挂载到页面的时刻--组件将要挂载到页面的时刻执行')
    // }
    //
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log('1-shouldComponentUpdate----组件更新之前执行')
    //     //返回false：不往下执行
    //     return true;
    // }
    //
    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log('2-componentWillUpdate----组件更新前，shouldComponentUpdate函数之后执行')
    //     //返回false：不往下执行
    //     return true;
    // }

    render() {
        //render函数是只要有state和props变化就会执行
        //console.log('3-render----组件挂载中--开始挂载渲染--')
        return (
            //tip:Fragment,flex  字面量，js代码用{xxx.xxx}
            <Fragment>
                <div>
                    {/*<input value={this.state.inputValue} onChange={this.inputChange}/>
                     htmlFor---for
                     className---name
                     onChange--onchange
                    */}
                    <label htmlFor='fuwu'>服务</label>
                    <input id='fuwu' className='input'
                        value={this.state.inputValue}
                        ref={(input) => {
                            this.input = input
                        }}
                        onChange={this.inputChange.bind(this)} />

                    <button onClick={this.addList.bind(this)}> 增加服务</button>
                </div>
                <p>组件外层包裹原则</p>
                <ul ref={(ul) => {
                    this.ul = ul
                }}>
                    <TransitionGroup>
                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <CSSTransition
                                        timeout={1000}
                                        classNames='boss-text'
                                        unmountOnExit
                                        appear={true}
                                        key={index + item}
                                    >
                                        <XiaojiejieItem
                                            content={item}
                                            index={index}
                                            delItem={this.delItem.bind(this, index)}
                                        />
                                    </CSSTransition>
                                )
                            })
                        }
                    </TransitionGroup>

                </ul>
                <Boss />
            </Fragment>
        )
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('4-componentDidUpdate----组件更新完成后执行')
    // }
    //
    // componentDidMount() {
    //     console.log('componentDidMount----组件将要挂载完成--组件挂载完成的时刻执行')
    // }

    inputChange(e) {
        //tip：一个是this指向不对，你需要重新用bind设置一下指向(ES6的语法)。
        //tip：另一个是React中改变值需要使用this.setState方法。
        //打印目标input的值
        // 错误写法  this.state.inputValue='sdf';
        //console.log(this);//如果不用this.inputChange.bind(this),this就是undefined
        // var list = this.state.list;
        // list.push(e.taret.value);
        this.setState({
            inputValue: this.input.value,
        })
    }

    //增加列表
    addList() {
        //tip：运算扩展符：...  数组先扩展，再增加一个元素
        //setState 是一个异步的方法，渲染虚拟的dom是需要时间的，所以有个回调函数
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        }, () => {
            //setState的回调函数
            //this.ul dom节点对象 ,jquery对象：$(this.ul).find('li')
            console.log(this.ul.querySelectorAll('li').length);
        })
    }

    // tip:React是禁止直接操作state的:错误案列：this.state.list.splice(index, 1);
    delItem(index) {
        console.log(index)
        let mylist = this.state.list;
        mylist.splice(index, 1);
        this.setState({
            list: mylist
        })

    }
}

export default Xiaojiejie
// {
//     this.state.list.map((item, index) => {
//         // tip:<li>{item}</li>报错没有key，就是在用map循环时，需要设置一个不同的值，这个时React的要求。我们可以暂时用index+item的形式来实现
//         // return <li key={index}>{item}</li> 容易错
//         // 有了()就可以换行了
//         //tip:JSX中的html解析问题:dangerouslySetInnerHTML
//         return (
//             <XiaojiejieItem content={item}
//                 // avname={this.state.avname}
//                             key={index + item}
//                             index={index}
//                             list={this.state.list}
//                             delItem={this.delItem.bind(this, index)}/>

//             // <li key={index + item} onClick={this.delItem.bind(this, index)}
//             //     dangerouslySetInnerHTML={{__html: item}}
//             // >
//             //     {/*{item}   dangerouslySetInnerHTML使得item支持html解析*/}
//             // </li>
//         )
//     })
// }