import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
const NavTabs = () => {
    return (
        <ButtonGroup vertical>
            
            <DropdownButton
            variant="outline-info"
            size="sm"
                as={ButtonGroup}
                title="CMDB"
                id="bg-nested-dropdown"
            >
                <Dropdown.Item className="text-center bg-info" eventKey="1" href="/cmdb/endpoints">ServerAndPc</Dropdown.Item>
               
            </DropdownButton>
        </ButtonGroup>
    );
};
export default NavTabs;
