import { useEffect, useState } from 'react';
import { ReactComponent as TrainMap } from './circle_map.svg';

const Map = () => {
  const [selected, setselected] = useState([]);

  useEffect(() => {
    console.log('fdf');
  }, []);

  return (
    <section className="map">
      <TrainMap />
    </section>
  );
};

export default Map;
