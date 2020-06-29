import React, { useState, useRef, RefObject } from 'react';

export interface RoomItem {
  name: string
  description: string
  dependantOn?: string
  position?: string
}

export interface RoomAction {
  name: string
  description?: string
  dependantOn?: string
  isFinalAction?: boolean
}

export interface RoomConfiguration {
  id: string
  name: string
  season: number
  episode: number
  introduction: string
  cheatsheet: string
  conclusion: string
  items: RoomItem[]
  actions: {[key: string]: RoomAction[]}
}

export interface RoomExplorerProps {
  room: RoomConfiguration
}
 
const RoomExplorer: React.FC<RoomExplorerProps> = ({ room }) => {

  const [openSection, setOpenSection] = useState<('introduction' | 'cheatsheet' | 'items' | 'conclusion' | '')>('');
  const [selectedItem, setSelectedItem] = useState<RoomItem>()

  const refs = room.items.reduce<{[key: string]: RefObject<HTMLDivElement>}>((acc, value) => {
    acc[value.name] = React.createRef();
    return acc;
  }, {});

  const handleClick = (id: string) => {
    const ref = refs[id];
    if (!ref || !ref.current) return;
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const RoomItemTile = (items: RoomItem[]) => {
    return <div className="flex justify-center items-center flex-col">
      { items.map(i => <div className="cursor-pointer" onClick={() => { handleClick(i.name) }}>{i.name}</div>) }
    </div>
  }
  
  const RoomItemWallTile = (position: string, items: RoomItem[]) => {
    const direction = getCardinalDirection(position);
    return <div className={`flex flex-col ${direction === 'N' || direction === 'S' ? 'items-center' : 'justify-center'} ${direction === 'W' ? 'items-end': ''}`}>
      { items.map(i => {
        return <div className={`cursor-pointer p-3 ${direction === 'N' || direction === 'S' ? 'w-full': 'w-fit'} bg-white rounded border-black border-2 text-center`} onClick={() => { handleClick(i.name) }}>{i.name}</div>
      }) }
    </div>
  }

  function getCardinalDirection(position?: string) {
    if (!position) return 'Z';
    return position.slice(0, 1);
  } 
  
  function getRoomItemForLocation(position: string, room: RoomConfiguration) {
    const items = room.items.filter(i => i.position === position);
    if (!items.length) return <div></div>
  
    if(isNaN(Number(position))) {
      return RoomItemWallTile(position, items);
    }
  
    return RoomItemTile(items);
  }

  return ( <div className="flex h-screen w-screen sm:flex-row flex-col">
      <div className="flex-grow sm:h-screen h-1/2 bg-gray-100 relative">
        <div className="grid grid-cols-5 grid-rows-5 h-full w-full absolute top-0 left-0 z-10">
          <div></div>
          { getRoomItemForLocation('N1', room) }
          { getRoomItemForLocation('N2', room) }
          { getRoomItemForLocation('N3', room) }
          <div></div>

          { getRoomItemForLocation('W1', room) }
          { getRoomItemForLocation('1', room) }
          { getRoomItemForLocation('2', room) }
          { getRoomItemForLocation('3', room) }
          { getRoomItemForLocation('E1', room) }

          { getRoomItemForLocation('W2', room) }
          { getRoomItemForLocation('4', room) }
          { getRoomItemForLocation('5', room) }
          { getRoomItemForLocation('6', room) }
          { getRoomItemForLocation('E2', room) }

          { getRoomItemForLocation('W3', room) }
          { getRoomItemForLocation('7', room) }
          { getRoomItemForLocation('8', room) }
          { getRoomItemForLocation('9', room) }
          { getRoomItemForLocation('E3', room) }

          <div></div>
          { getRoomItemForLocation('S1', room) }
          { getRoomItemForLocation('S2', room) }
          { getRoomItemForLocation('S3', room) }
          <div></div>

        </div>
        <div className="grid grid-cols-5 grid-rows-5 h-full w-full z-0">
          <div className="row-start-2 row-end-5 row-span-3 col-start-2 col-end-5 col-span-3 bg-white -m-8 p-5 rounded-md border-black border-2 relative">
            <div className="w-full h-full rounded border-black border-2"></div>
          </div>
        </div>
      </div>
      <div className="sm:h-screen h-1/2 sm:w-1/2 w-full bg-white p-6 overflow-y-scroll">
        <div className="mb-4">
          <h1 className="text-lg leading-7 font-medium">
            The Cullodens' servant quarters
          </h1>
          <p className="text-sm leading-5 text-gray-500">
            Season 4, Episode 6
          </p>
        </div>
        <div className="p-4 form-input rounded flex flex-col h-fit mb-4">
          <div className="flex justify-between cursor-pointer" onClick={() => setOpenSection(openSection === 'introduction' ? '' : 'introduction')}><span className="text-lg leading-6 font-medium text-gray-900">Introduction</span><span>{openSection === 'introduction' ? '%open' : '%closed'}</span></div>
          {openSection === 'introduction' ? <div className="mt-3">
            { room.introduction.split('\n').map(i => <p className="text-md leading-6 text-gray-900 pb-3">{i}</p>) }
          </div> : null }
        </div>
        <div className="p-0 form-input rounded flex flex-col h-fit mb-4">
          <div className="flex justify-between cursor-pointer p-4" onClick={() => setOpenSection(openSection === 'items' ? '' : 'items')}><span className="text-lg leading-6 font-medium text-gray-900">Items</span><span>{openSection === 'items' ? '%open' : '%closed'}</span></div>
          {openSection === 'items' ? <div className="">
            { 
              room.items.map(i => <div className="border-b" key={i.name} ref={refs[i.name]}>
                <div className={`${room.actions[i.name] ? 'border-b' : ''} mb-3 m-4`}>
                  <strong><p className="text-lg leading-6 text-gray-900 pb-3">{i.name}</p></strong>
                  <p className="text-md leading-6 text-gray-700 pb-3">{i.description}</p>
                  { i.dependantOn ? <p className="text-md leading-6 text-gray-900 p-2 px-4 mb-4 bg-gray-100 rounded"><strong>Dependant on: </strong>{i.dependantOn}</p> : null }
                </div>
                <div>
                  { (room.actions[i.name] ?? []).map(a => {
                    return <div className="mx-6">
                      <strong><p className="text-md leading-6 text-gray-900 pb-3">• {a.name}</p></strong>
                      <p className="text-md leading-6 text-gray-700 pb-3">{a.description}</p>
                      { a.dependantOn ? <p className="text-md leading-6 text-gray-900 p-2 px-4 mb-4 bg-gray-100 rounded"><strong>Dependant on: </strong>{a.dependantOn}</p> : null }
                      { a.isFinalAction ? <p className="cursor-pointer text-md leading-6 text-gray-900 p-2 px-4 mb-4 bg-gray-100 rounded" onClick={() => setOpenSection('conclusion')}><strong>This is the final action! Click to jump to Conclusion.</strong></p> : null }
                      </div>
                  }) }
                </div>
              </div>) }
          </div> : null }
        </div>
        <div className="p-4 form-input rounded flex flex-col h-fit mb-4">
          <div className="flex justify-between cursor-pointer" onClick={() => setOpenSection(openSection === 'cheatsheet' ? '' : 'cheatsheet')}><span className="text-lg leading-6 font-medium text-gray-900">GM's Cheatsheet</span><span>{openSection === 'cheatsheet' ? '%open' : '%closed'}</span></div>
          {openSection === 'cheatsheet' ? <div className="mt-3">
            { room.cheatsheet.split('\n').map(i => <p className="text-md leading-6 text-gray-900 pb-3">{i}</p>) }
          </div> : null }
        </div>
        <div className="p-4 form-input rounded flex flex-col h-fit mb-4">
          <div className="flex justify-between cursor-pointer" onClick={() => setOpenSection(openSection === 'conclusion' ? '' : 'conclusion')}><span className="text-lg leading-6 font-medium text-gray-900">Conclusion</span><span>{openSection === 'conclusion' ? '%open' : '%closed'}</span></div>
          {openSection === 'conclusion' ? <div className="mt-3">
            { room.conclusion.split('\n').map(i => <p className="text-md leading-6 text-gray-900 pb-3">{i}</p>) }
          </div> : null }
        </div>
      </div>
      <div></div>
    </div> 
   );
}
 
export default RoomExplorer;