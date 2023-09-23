import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
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
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
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
        dispatch(setSearchVal(searchParams.get("search_val") || ""));
        dispatch(setEndpointType(searchParams.get("endpoint_type") || ""));
        dispatch(setTags(searchParams.getAll("tags[]") || []));
        dispatch(setCurrentPage(Number(searchParams.get("page")) || 1));
    }, [searchParams, dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        searchParams.set("search_val", searchVal);
        dispatch(setCurrentPage(1));
        setSearchParams(searchParams);
        navigate(`/cmdb/endpoints?${searchParams.toString()}`, {
            replace: true,
        });
    };

    const handleFilter = (e) => {
        const { name, value } = e.target;
        if (name === "endpoint_type") {
            searchParams.set("endpoint_type", value);
            dispatch(setEndpointType(value));
            navigate(`/cmdb/endpoints?${searchParams.toString()}`, {
                replace: true,
            });
        } else if (name === "tag") {
            const selectedTags = Array.from(
                e.target.selectedOptions,
                (option) => option.value
            );
            searchParams.set("tag", selectedTags);
            dispatch(setTags(selectedTags));
            navigate(`/cmdb/endpoints?${searchParams.toString()}`, {
                replace: true,
            });
        }
    };

    const handlePageChange = (page) => {
        tags.forEach((tag) => searchParams.append("tags[]", tag));
        searchParams.set("page", page);
        if (tag) {
            searchParams.set("tag", tag);
        }
        dispatch(setCurrentPage(page));
        setSearchParams(searchParams);
        navigate(`/cmdb/endpoints?${searchParams.toString()}`, {
            replace: true,
        });
    };

    const handleReset = () => {
        dispatch(setSearchVal(""));
        dispatch(setEndpointType(""));
        dispatch(setTags([]));
        dispatch(setCurrentPage(1));
        navigate("/cmdb/endpoints");
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
                        {[...new Set(endpoints.map((item) => item.tag))].map(
                            (tagValue) => (
                                <option key={tagValue} value={tagValue}>
                                    {tagValue}
                                </option>
                            )
                        )}
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
