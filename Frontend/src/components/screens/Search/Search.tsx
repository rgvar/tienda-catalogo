import { useEffect, useState } from "react"
import { ListInstrumentos } from "../../ui/ListInstrumentos/ListInstrumentos"
import { IInstrumento } from "../../../types/IInstrumento"
import { Button, Form, InputGroup } from "react-bootstrap";
import styles from './Search.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { searchInstrumentos } from "../../../api/ApiGateway";

export const Search = () => {

    const [data, setData] = useState<IInstrumento[]>([]);
    const [searchData, setSearchData] = useState<String>('');

    const { search } = useParams<{search: string}>();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fetchData = async () => {
            setData(await searchInstrumentos(search || '') as IInstrumento[]);

        };
        fetchData();
        navigate(`/search/${searchData}`)
    };

    useEffect( () => {
        const fetchData = async () => {
            setData(await searchInstrumentos(search || '') as IInstrumento[]);

        };
        fetchData();

    }, [search]);


    return (
        <div className={styles.listSearchContainer}>
            <div>
                <Form
                    className={styles.formContainer}
                    onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputGroup.Text>Ingrese su búsqueda: </InputGroup.Text>
                        <Form.Control onChange={handleChange} type="text" name="search" />
                        <Button variant="primary" type="submit" >Buscar</Button>
                    </InputGroup>
                </Form>


            </div>
            <ListInstrumentos items={data} message="Nada para mostrar" />
        </div>
    );
};
