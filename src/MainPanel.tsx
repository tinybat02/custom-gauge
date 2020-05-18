import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, FieldBuffer } from 'types';
import StopIcon from './img/stop-icon.png';
import GoIcon from './img/go-icon.png';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  num: number;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    num: 0,
  };

  componentDidMount() {
    console.log('data ', this.props.data);
    const fields = this.props.data.series[0].fields as FieldBuffer[];
    this.setState({ num: fields[0].values.buffer[0] });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series[0] !== this.props.data.series[0]) {
      const fields = this.props.data.series[0].fields as FieldBuffer[];
      this.setState({ num: fields[0].values.buffer[0] });
    }
  }

  render() {
    const { width, height } = this.props;
    const { num } = this.state;

    return (
      <div
        style={{
          width,
          height,
        }}
      >
        <CircularProgressbarWithChildren value={num == 0 ? 0 : num == 1 ? 33 : num == 2 ? 66 : 100}>
          {num <= 2 ? (
            <img style={{ width: width / 2.2, transform: 'translateY(5px)' }} src={GoIcon} />
          ) : (
            <img style={{ width: width / 2.2, transform: 'translateY(5px)' }} src={StopIcon} />
          )}
          <div style={{ fontSize: 16, transform: 'translateY(10px)' }}>
            <strong>{num}</strong>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    );
  }
}
