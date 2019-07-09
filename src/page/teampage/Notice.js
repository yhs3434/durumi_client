import React, {Component} from 'react';

class Notice extends Component {
    render() {
        return(
            <div>
                notice
                {this.props.teamSelected}
            </div>
        )
    }
}

export default Notice;