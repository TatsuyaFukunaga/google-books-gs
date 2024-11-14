import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

export class GoogleBook {
    private link: string
    private title: string
    private authors: string[]
    private publisher: string
    private publishedDate: string
    private description: string

    constructor(link: string, title: string, authors: string[], publisher: string, publishedDate: string, description: string) {
        this.link = link;
        this.title = title;
        this.authors = authors;
        this.publisher = publisher;
        this.publishedDate = publishedDate;
        this.description = description;
    }
    public getCard = (cardKey: number) => {
        return (
            <Grid key={cardKey} size={1}>
                {/* <Card sx={{ maxWidth: 200 }} elevation={10}> */}
                <Card elevation={10}>
                    <CardMedia
                        sx={{ height: 300 }}
                        image={`${this.link ? this.link : "./null.jpg"}`}
                        title={`${this.title ? this.title : ""}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {`${this.title ? this.title : ""}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`著者: ${this.authors ? this.authors.map((item) => item + ' ') : ''}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`出版社: ${this.publisher ? this.publisher : ''}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`出版日: ${this.publishedDate ? this.publishedDate : ''}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`説明: ${this.description ? this.description : ''}`}
                        </Typography>
                    </CardContent>


                </Card>
            </Grid>
        )
    }
}
