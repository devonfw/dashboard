import { Component, RefObject } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface InstallationProps {
    installationUpdate: string;
    scrollAnchor: RefObject<HTMLDivElement>;
}

export default class InstallationTerminal extends Component<InstallationProps> {
    constructor(props: InstallationProps) {
        super(props);
    }
    render() {
        return (
                <div>
                    {this.props.installationUpdate}
                    <div ref={this.props.scrollAnchor}></div>
                    {/* { !this.props.installationUpdate.includes('success') || !this.props.installationUpdate.includes('error') ?
                        <div><CircularProgress /></div> : null
                    } */}
                    
                </div>
        )
    }
}
