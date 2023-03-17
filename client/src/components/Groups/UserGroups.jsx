
const UserGroups = ({ items }) => {

  return (
      <div>
        {
          items.map((item, k) => {
            return (<div key={k}>{item.titleGroup} - {item.linkGroup}</div>)
          })
        }
      </div>
  )
}
export default UserGroups;