
export const ExtraTimeComponent: React.FC = () => {
    return(
    <div className="optimization-divider">
        <h3>Looks like you have a lot of time to do work on <b>Tuesday</b>.
        would you like to add a longer break?</h3>
        <div className="aligned">
        <button className="positive">Yes</button>
        <button className="negative">No</button>
        </div>
    </div>
    )
}