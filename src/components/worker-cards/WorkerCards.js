import React, {Fragment, Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import './WorkerCards.scss'
import WorkerCard from '../worker-card/WorkerCard'
import {dislikeWorker, likeWorker} from "./actions";

export class WorkerCards extends Component {
    constructor(props) {
        super(props);

        this.handleSwipeRight = this.handleSwipeRight.bind(this);
        this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    }

    handleSwipeLeft() {
        const {onSwipedLeft} = this.props;

        if (onSwipedLeft) {
            onSwipedLeft(this.currentIndex);
        }
    }

    handleSwipeRight() {
        const {onSwipedRight} = this.props;

        if (onSwipedRight) {
            onSwipedRight(this.currentIndex);
        }
    }

    get filteredWorkers() {
        return this.props.workers.slice().filter(worker => worker.liked === undefined);
    }

    get currentIndex() {
        let index = -1;

        this.props.workers.slice().forEach((worker, i) => {
            if (worker.liked === undefined && index < 0) {
                index = parseInt(i, 10);
            }
        });

        return index;
    }

    render() {
        const {workers} = this.props;
        const filteredWorkers = this.filteredWorkers;

        return (
            <div className="WorkerCards">
                {filteredWorkers.length === 0 && (
                    <div className="WorkerCards-no-result">
                        No more workers now.
                    </div>
                )}
                {filteredWorkers.length > 0 && (
                    <div className="WorkerCards-position">
                        {filteredWorkers[0].position}
                    </div>
                )}
                {filteredWorkers.length > 0 && (
                    <div className="WorkerCards-stack">
                        {workers.map((worker, i) => (
                            worker.liked === undefined
                                ? <Fragment key={`worker-${i}`}>
                                    <div className="WorkerCards-spacer"/>
                                    <div className="WorkerCards-worker">
                                        <WorkerCard
                                            name={worker.name}
                                            imageUrl={worker.imageUrl}
                                            onSwipedLeft={this.handleSwipeLeft}
                                            onSwipedRight={this.handleSwipeRight}
                                        />
                                    </div>
                                </Fragment>
                                : null
                        ))}
                        <div className="WorkerCards-buttons">
                            <div
                                className="button dislike"
                                onTouchEnd={this.handleSwipeLeft}
                                onClick={this.handleSwipeLeft}
                            >
                            </div>

                            <div
                                className="button like"
                                onTouchEnd={this.handleSwipeRight}
                                onClick={this.handleSwipeRight}
                            >
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

WorkerCards.defaultProps = {
    workers: []
};

WorkerCards.propTypes = {
    workers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            imageUrl: PropTypes.string,
            liked: PropTypes.bool
        })
    ),
    onSwipedLeft: PropTypes.func,
    onSwipedRight: PropTypes.func
};

function mapStateToProps(state) {
    return {
        workers: state.cards.workers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSwipedLeft: index => dispatch(dislikeWorker(index)),
        onSwipedRight: index => dispatch(likeWorker(index))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkerCards)