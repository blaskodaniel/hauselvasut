import { useEffect, useState } from 'react';
import { Empty, Slider, Spin, Switch, notification } from 'antd';
import { GetStatus } from '../services/functions';
import TrainInfoBox from './train-info-box';

const Main = () => {
  const [status, setstatus] = useState([]);
  const [loader, setloader] = useState(true);

  const getStatus = async () => {
    try {
      const resp = await GetStatus();
      if (resp) {
        setstatus(resp.data);
      }
    } catch (ex) {
      notification.error({
        message: 'Hiba történt!',
        description: 'Vonatok státusza lekérdezése közben',
      });
    } finally {
      setloader(false);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="main">
      <div className="train-list">
        <p>Regisztrált vonatok</p>
        {loader && (
          <small>
            <Spin tip="Vonatok lekérése ...." />
          </small>
        )}
        {!loader && (
          <div className="train-info-wrapper">
            {status.length === 0 && <Empty description="Nincsenek vonatok" image="/img/train3.png" />}
            {status.map((train) => (
              <TrainInfoBox key={train.id} train={train} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
