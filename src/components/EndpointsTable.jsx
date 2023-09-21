import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Table, Button, Pagination, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
    setSearchVal,
    setEndpointType,
    setTags,
    setCurrentPage,
} from "../store/endpointsSlice";

const EndpointsTable = () => {
    const dispatch = useDispatch();
    const {
        endpoints,
        searchVal,
        endpointType,
        tags,
        currentPage,
        itemsPerPage,
    } = useSelector((state) => state.endpoints);
    const { tag } = useParams();
    const [filteredEndpoints, setFilteredEndpoints] = useState([]);

    useEffect(() => {
        // Фильтрация на основе поиска, типа или тэга
        const filtered = endpoints.filter((endpoint) => {
            const nameMatch = endpoint.name
                .toLowerCase()
                .includes(searchVal.toLowerCase());
            const typeMatch =
                endpoint.type === endpointType || endpointType === "";
            const tagsMatch =
                tags.length === 0 ||
                tags.every((tag) =>
                    endpoint.tag.toLowerCase().includes(tag.toLowerCase())
                );
            return nameMatch && typeMatch && tagsMatch;
        });
        setFilteredEndpoints(filtered);
    }, [endpoints, searchVal, endpointType, tags]);
    useEffect(() => {
        // Анализ параметров URL и обновление состояния Redux
        const searchParams = new URLSearchParams();
        searchParams.set("search_val", searchVal);
        searchParams.set("endpoint_type", endpointType);
        tags.forEach((tag) => searchParams.append("tags[]", tag));
        searchParams.set("page", 1);
        if (tag) {
            searchParams.set("tag", tag);
        }
        dispatch(setSearchVal(searchVal));
        dispatch(setEndpointType(endpointType));
        dispatch(setTags(tags));
        dispatch(setCurrentPage(1));
    }, [searchVal, endpointType, tags, tag, dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchParams = new URLSearchParams();
        searchParams.set("search_val", searchVal);
        searchParams.set("endpoint_type", endpointType);
        tags.forEach((tag) => searchParams.append("tags[]", tag));
        searchParams.set("page", 1);
        if (tag) {
            searchParams.set("tag", tag);
        }
        dispatch(setCurrentPage(1));
        window.history.replaceState(
            null,
            "",
            `/cmdb/endpoints?${searchParams.toString()}`
        );
    };
    const handleFilter = (e) => {
        const { name, value } = e.target;
        if (name === "endpoint_type") {
            dispatch(setEndpointType(value));
        } else if (name === "tag") {
            const selectedTags = Array.from(
                e.target.selectedOptions,
                (option) => option.value
            );
            dispatch(setTags(selectedTags));
        }
    };
    const handlePageChange = (page) => {
        const searchParams = new URLSearchParams();
        searchParams.set("search_val", searchVal);
        searchParams.set("endpoint_type", endpointType);
        tags.forEach((tag) => searchParams.append("tags[]", tag));
        searchParams.set("page", page);
        if (tag) {
            searchParams.set("tag", tag);
        }
        window.history.replaceState(
            null,
            "",
            `/cmdb/endpoints?${searchParams.toString()}`
        );
        dispatch(setCurrentPage(page));
    };
    const handleReset = () => {
        dispatch(setSearchVal(""));
        dispatch(setEndpointType(""));
        dispatch(setTags([]));
        dispatch(setCurrentPage(1));
      };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedEndpoints = filteredEndpoints.slice(startIndex, endIndex);

    return (
        <Container>
            <Form onSubmit={handleSearch}>
                <Form.Group controlId="searchVal">
                    <Form.Label>Search by name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name server or pc"
                        value={searchVal}
                        onChange={(e) => dispatch(setSearchVal(e.target.value))}
                    />
                </Form.Group>
                <Form.Group controlId="endpointType">
                    <Form.Label>Filter by type:</Form.Label>
                    <Form.Control
                        as="select"
                        value={endpointType}
                        onChange={handleFilter}
                        name="endpoint_type"
                    >
                        <option value="">All</option>
                        <option value="server">Server</option>
                        <option value="pc">PC</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="tags">
                    <Form.Label>Filter by tags:</Form.Label>
                    <Form.Control
                        as="select"
                        value={tag}
                        onChange={handleFilter}
                        name="tag"
                    >
                        <option value="">All</option>
  {Array.from(new Set(endpoints.map(item => item.tag))).map(tagValue => (
    <option key={tagValue} value={tagValue}>{tagValue}</option>
  ))}
                        {/* <option value="">All</option>
                        <option value="tag1">tag1</option>
                        <option value="tag2">tag2</option>
                        <option value="tag3">tag3</option>
                        <option value="tag4">tag4</option>
                        <option value="tag5">tag5</option> */}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="reset" onClick={handleReset}>
                    Clear
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Tag</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedEndpoints.map((endpoint) => (
                        <tr key={endpoint.id}>
                            <td>{endpoint.id}</td>
                            <td>{endpoint.name}</td>
                            <td>{endpoint.tag}</td>
                            <td>{endpoint.type}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {[
                    ...Array(
                        Math.ceil(filteredEndpoints.length / itemsPerPage)
                    ),
                ].map((_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export default EndpointsTable;
