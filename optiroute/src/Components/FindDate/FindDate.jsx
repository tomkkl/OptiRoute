const FindDate = () => {
    const [events, setEvents] = useState(null)
    useEffect(() => {
        const fetchUsers = async () => {
          const responce = await fetch('/api/events')
          const json = await responce.json()
    
          if(responce.ok){
              setEvents(json)
              console.log("Got events")
          }
        }
        fetchEvents()
      }, [])
    return (
        <div className="Events">
            (events)[0];
        </div>
    )
}
export default FindDate;