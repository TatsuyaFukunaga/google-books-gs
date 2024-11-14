import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react'
import { GoogleBook } from './GoogleBook';
import Grid from '@mui/material/Grid2';


let gbs: GoogleBook[] = [];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '12ch',
            },
        },
    },
}));



export default function Header() {
    const [search, setSearch] = useState("");
    const [googleBooks, setGoogleBooks] = useState([] as GoogleBook[]);
    const getGoogleBooksList = async () => {
        gbs = [];
        const url: string = `https://www.googleapis.com/books/v1/volumes?q=${search}`;
        const json = await fetch(url).then((response): any => response.json())
            .then((data) => {
                let jsonData = JSON.stringify(data);
                let objData = JSON.parse(jsonData);
                const books = objData.items;
                // eslint-disable-next-line array-callback-return
                books.map((item: any) => {
                    const gb: GoogleBook = new GoogleBook(item.volumeInfo.imageLinks.thumbnail, item.volumeInfo.title, item.volumeInfo.authors, item.volumeInfo.publisher, item.volumeInfo.publishedDate, item.volumeInfo.description);
                    gbs.push(gb);
                    setGoogleBooks(gbs);
                });
            }
            )
    }

    const handleSearch = (e: any) => {
        setSearch(e.target.value)
    };

    const handleSearchKeyDown = (e: any) => {
        if (e.key === "Enter") {
            getGoogleBooksList();
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, margin: 'auto' }}
                    >
                        Google Books Search
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => handleSearch(e)}
                            onKeyDown={(e) => handleSearchKeyDown(e)}
                            id="search"
                        />
                    </Search>
                </Toolbar>
            </AppBar>

            <div className='content'>
                <Grid container spacing={{ xs: 0.5, md: 2 }} columns={{ xs: 2, sm: 3, md: 4 }}>
                    {googleBooks.map(
                        (item, index) => googleBooks[index].getCard(index)
                    )}
                </Grid>
            </div>
        </Box>
    );
}