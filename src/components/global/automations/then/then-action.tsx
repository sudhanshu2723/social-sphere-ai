

type Props={
  id:string
}

export default function  ThenNode({id}:Props){
    const {}=useListener(id);
    return (
        <div>Then Action</div>
    )
}