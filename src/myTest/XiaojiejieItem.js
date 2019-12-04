import React, {Component} from 'react'
import PropTypes from 'prop-types'

class XiaojiejieItem extends Component {
    constructor(props) {
        super(props)
        //tip:有言曰：构造函数中绑定性能会高一些，特别是在高级组件开发中，会有很大的作用）
        //tip:constructor绑定this方法。
        this.handerClick = this.handerClick.bind(this)
    }

    render() {
        //tip:key={this.props.key} 写这里会报错，这里直接用this.handerClick.bind(this)，也会报错
        return (
            <li onClick={this.handerClick}>
                {this.props.avname}为你服务--{this.props.content}
            </li>
        )
    }

    //1.组件第一次存在于dom中，函数不会被执行
    //如果已经存在于dom中，函数财被执行
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps--子组件接收到父组件传递过来的参数，父组件render函数重新被执行，这个生命周期就会被执行。')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount--组件将要被删除之前执行')
    }

    handerClick() {
        this.props.delItem(this.props.index)
        console.log(this.props.list)
    }
}

XiaojiejieItem.propTypes = {
    avname: PropTypes.string,
    content: PropTypes.string.isRequired,//isRequired表示该值必须要传,
    index: PropTypes.number,
    delItem: PropTypes.func
}
XiaojiejieItem.defaultProps = {
    avname: '松岛枫'
}

export default XiaojiejieItem

//tip:单项数据流：父组件给子组件传递的属性，是不可以在子组件里修改的，是只读的
// 函数式编程的好处是什么
// 函数式编程让我们的代码更清晰，每个功能都是一个函数。
// 函数式编程为我们的代码测试代理了极大的方便，更容易实现前端自动化测试。
