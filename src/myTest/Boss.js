import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'

class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
        this.toToggle = this.toToggle.bind(this)
    }
    //className={this.state.isShow ? 'show' : 'hide'}

    render() {
        return (
            <div>
                <CSSTransition 
                in={this.state.isShow} 
                timeout={2000} 
                classNames="boss-text"
                 unmountOnExit  //退场的时候dom元素也删掉
                >
                    <div>孙悟空</div>
                    </CSSTransition>
                <div><button onClick={this.toToggle}>召唤boss</button></div>

            </div>);
    }
    //true/false来回切换
    toToggle() {
        this.setState({
            isShow: this.state.isShow ? false : true
        })
    }
}

export default Boss;