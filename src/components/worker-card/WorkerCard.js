import React from 'react'
import PropTypes from 'prop-types'
import './WorkerCard.scss'

export default class WorkerCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            originalX: 0,
            originalY: 0,
            left: 0
        };

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    getCurrentPosition(touch) {
        const {screenX, screenY} = touch;

        return {
            x: parseInt(screenX, 10),
            y: parseInt(screenY, 10)
        }
    }

    getDelta(touch) {
        const {originalX, originalY} = this.state;
        const {x, y} = this.getCurrentPosition(touch);

        return {
            x: x - originalX,
            y: y - originalY
        }
    }

    onTouchStart(e) {
        const touch = e.changedTouches[0];
        const {x, y} = this.getCurrentPosition(touch);

        this.setState({originalX: x, originalY: y})
    }

    onTouchMove(e) {
        const touch = e.changedTouches[0];
        const {x: deltaX} = this.getDelta(touch);
        const {x: currentX} = this.getCurrentPosition(touch);

        if (deltaX !== 0) {
            this.setState({
                left: currentX - this.state.originalX
            });
        }
    }

    onTouchEnd(e) {
        const touch = e.changedTouches[0];
        const {x: deltaX} = this.getDelta(touch);
        const current = this.getCurrentPosition(touch);
        const {onSwipedLeft, onSwipedRight, threshold} = this.props;
        const {originalX} = this.state;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0 && onSwipedRight) {
                onSwipedRight(originalX, current.x);
            }

            if (deltaX < 0 && onSwipedLeft) {
                onSwipedLeft(originalX, current.x);
            }
        } else {
            this.setState({
                left: 0
            });
        }

        this.setState({
            originalX: 0,
            originalY: 0
        });
    }

    render() {
        const {name, imageUrl} = this.props;
        const {left} = this.state;

        const style = {
            left: `${left}px`
        };

        return (
            <div
                className="WorkerCard"
                onTouchEnd={this.onTouchEnd}
                onTouchMove={this.onTouchMove}
                onTouchStart={this.onTouchStart}
                style={style}
            >
                <div className="WorkerCard-card">
                    <img
                        src={imageUrl}
                        alt={name}
                    />
                    {name}
                </div>
            </div>
        )
    }
}

WorkerCard.defaultProps = {
    threshold: 40
};

WorkerCard.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    threshold: PropTypes.number,
    onSwipedLeft: PropTypes.func,
    onSwipedRight: PropTypes.func
};