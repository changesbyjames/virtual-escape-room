import React from 'react';
import { RoomConfiguration } from './RoomExplorer';

export interface RoomMapProps {
  room: RoomConfiguration
}

const RoomMap: React.FC<RoomMapProps> = ({ room }) => {
  return (
    <div>
    </div> 
   );
}
 
export default RoomMap;