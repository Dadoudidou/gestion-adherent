import * as React from "react";
import * as ReactDOM from "react-dom";
import prefix from "./prefix"

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;
const __components: {
    [key: string]: { prevPosition: any, prevElement: any }
} = {};

export type OverdriveProps = {
    id: string
    duration?: number
    element?: string
    animationDelay?: number
    onAnimationEnd?: () => void
}

type OverdriveState = {
    loading: boolean
}

export class OverDrive extends React.PureComponent<OverdriveProps, OverdriveState>
{
    static defaultProps: Partial<OverdriveProps> = {
        element: "div",
        duration: 200,
        animationDelay: 100
    }

    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }

    element: Element
    onShowLock: boolean
    animationDelayTimeout: NodeJS.Timer
    animationTimeout: NodeJS.Timer
    bodyElement: HTMLDivElement

    animate = (prevPosition, prevElement) => {

        const {duration} = this.props;

        prevPosition.top += (window.pageYOffset || document.documentElement.scrollTop);
        const nextPosition = this.getPosition(true);
        const noTransform = 'scaleX(1) scaleY(1) translateX(0px) translateY(0px)';
        const targetScaleX = prevPosition.width / nextPosition.width;
        const targetScaleY = prevPosition.height / nextPosition.height;
        const targetTranslateX = prevPosition.left - nextPosition.left;
        const targetTranslateY = prevPosition.top - nextPosition.top;

        if (targetScaleX === 1 &&
            targetScaleY === 1 &&
            targetTranslateX === 0 &&
            targetTranslateY === 0) {
            return;
        }

        const transition = {
            transition: `transform ${duration / 1000}s, opacity ${duration / 1000}s`,
            transformOrigin: '0 0 0'
        };

        const sourceStart = React.cloneElement(prevElement, {
            key: '1',
            style: prefix({
                ...prevElement.style,
                ...transition,
                ...prevPosition,
                opacity: 1,
                transform: noTransform
            })
        });

        const sourceEnd = React.cloneElement(prevElement, {
            key: '1',
            style: prefix({
                ...prevElement.style,
                ...transition,
                ...prevPosition,
                margin: nextPosition.margin,
                opacity: 0,
                transform: `matrix(${1 / targetScaleX}, 0, 0, ${1 / targetScaleY}, ${-targetTranslateX}, ${-targetTranslateY})`
            })
        });
        let _target = React.Children.only(this.props.children) as any;
        const targetStart = React.cloneElement(_target, {
            key: '2',
            style: prefix({
                ..._target.style,
                ...transition,
                ...nextPosition,
                margin: prevPosition.margin,
                opacity: 0,
                transform: `matrix(${targetScaleX}, 0, 0, ${targetScaleY}, ${targetTranslateX}, ${targetTranslateY})`
            })
        });

        const targetEnd = React.cloneElement(_target, {
            key: '2',
            style: prefix({
                ..._target.style,
                ...transition,
                ...nextPosition,
                opacity: 1,
                transform: noTransform
            })
        });

        const start = <div>{sourceStart}{targetStart}</div>;
        const end = <div>{sourceEnd}{targetEnd}</div>;

        this.setState({loading: true});

        const bodyElement = document.createElement('div');
        window.document.body.appendChild(bodyElement);
        this.bodyElement = bodyElement;
        renderSubtreeIntoContainer(this, start, bodyElement);

        this.animationTimeout = setTimeout(() => {
            renderSubtreeIntoContainer(this, end, bodyElement);
            this.animationTimeout = setTimeout(this.animateEnd, duration);
        }, 0);
    }

    animateEnd = () => {
        this.animationTimeout = null;
        this.setState({loading: false});
        this.props.onAnimationEnd && this.props.onAnimationEnd();
        window.document.body.removeChild(this.bodyElement);
    }

    onHide = () => {
        const {id} = this.props;
        const onlyChild = React.Children.only(this.props.children);
        const prevElement = React.cloneElement(onlyChild);
        const prevPosition =this.getPosition();
        __components[id] = { prevElement, prevPosition }
        this.clearAnimations();
        setTimeout(() => {
            __components[id] = undefined;
        }, 100);
    }

    onShow = () => {
        if(this.onShowLock) return;
        this.onShowLock = true;
        const { id, animationDelay } = this.props;
        console.log(__components[id]);
        if(__components[id]){
            const { prevPosition, prevElement } = __components[id];
            __components[id] = undefined;
            if(animationDelay){
                this.animationDelayTimeout = setTimeout(() => {
                    this.animate(prevPosition, prevElement);
                }, animationDelay)
            }
        } else {
            this.setState({ loading: false });
        }
    }

    clearAnimations = () => {
        clearTimeout(this.animationDelayTimeout);
        clearTimeout(this.animationTimeout);
        if(this.animationTimeout) this.animateEnd();
    }

    getPosition = (addOffset: boolean = false): React.CSSProperties => {

        const node = this.element;
        const rect = node.getBoundingClientRect();
        const computedStyle = getComputedStyle(node);
        const marginTop = parseInt(computedStyle.marginTop, 10);
        const marginLeft = parseInt(computedStyle.marginLeft, 10);
        return {
            top: (rect.top - marginTop) + ((addOffset ? 1 : 0) * (window.pageYOffset || document.documentElement.scrollTop)),
            left: (rect.left - marginLeft),
            width: rect.width,
            height: rect.height,
            margin: computedStyle.margin,
            padding: computedStyle.padding,
            borderRadius: computedStyle.borderRadius,
            position: 'absolute'
        }
    }

    componentDidMount(){ 
        this.onShow();
    }

    componentWillUnmount(){
        this.onHide();
    }

    componentWillReceiveProps(){
        this.onShowLock = false;
        this.onHide();
    }

    componentDidUpdate(){
        this.onShow();
    }
    
    render(){
        const {
            id, duration, animationDelay, children, element, onAnimationEnd,
            ...rest
        } = this.props;

        let _style = { opacity: (this.state.loading ? 0 : 1) };
        const onlyChild = React.Children.only(children);

        return React.createElement(
            element,
            {
                ref: c => (this.element = c && c.firstChild as Element),
                style: _style,
                ...rest
            },
            onlyChild
        )
    }
}

export default OverDrive;