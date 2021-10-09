import { Button, Slider, Switch, Tooltip, notification } from 'antd';
import { useState } from 'react';
import { ChangeState, StartTrain, StopTrain } from '../services/functions';

const TrainInfoBox = ({ train }) => {
  const [trainState, setTrainState] = useState(train);

  const changeState = async (newtrain) => {
    try {
      console.log('Save', newtrain);
      await ChangeState(newtrain);
    } catch (ex) {
      notification.error({
        message: 'Hiba történt!',
        description: 'Mentés során hiba történt',
      });
    }
  };

  const onChangeHanlder = (value, prop) => {
    const changedTrain = { ...trainState, [prop]: value };
    setTrainState(changedTrain);
    changeState(changedTrain);
  };

  const onRunTrainHanlder = async (event) => {
    try {
      if (event === 'play') {
        const resp = await StartTrain(trainState.id);
        if (resp) {
          setTrainState(resp.data);
        }
      }
      if (event === 'stop') {
        const resp = await StopTrain(trainState.id);
        if (resp) {
          setTrainState(resp.data);
        }
      }
    } catch (err) {
      notification.error({
        message: 'Hiba történt!',
        description: 'Nem tindult el a vonat!',
      });
    }
  };

  return (
    <div className="train-info-box" style={{ background: trainState.isrun ? '#912424' : '#1c212b' }}>
      <div className="row">
        <div className="left">
          <h4>{trainState.name}</h4>
        </div>
        <div className="right">
          {!trainState.isrun ? (
            <Tooltip title="Vonat indítása">
              <Button type="primary" icon={<i className="las la-play" />} onClick={() => onRunTrainHanlder('play')} />
            </Tooltip>
          ) : (
            <Tooltip title="Vonat megállítása">
              <Button type="primary" icon={<i className="las la-stop" />} onClick={() => onRunTrainHanlder('stop')} />
            </Tooltip>
          )}
        </div>
      </div>
      <div className="row">
        <div className="left">
          <small>Id: {trainState.id}</small>
        </div>
        <div className="right" />
      </div>
      <div className="row">
        <div className="left">
          <small>Sebesség: {trainState.speed}</small>
        </div>
        <div className="right">
          <Slider
            min={0}
            max={1}
            step={0.1}
            defaultValue={trainState.speed}
            onChange={(value) => onChangeHanlder(value, 'speed')}
          />
        </div>
      </div>
      <div className="row">
        <div className="left">
          <small>Irány: {trainState.direction}</small>
        </div>
        <div className="right">
          <Switch
            checked={trainState.direction === 1}
            size="small"
            onChange={(value) => onChangeHanlder(value ? 1 : -1, 'direction')}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainInfoBox;
