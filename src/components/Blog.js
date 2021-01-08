import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import Footer from './Footer';

function validateUTF8(string) {
  var utf8 = /([\x00-\x7F]|([\xC2-\xDF]|\xE0[\xA0-\xBF]|\xED[\x80-\x9F]|(|[\xE1-\xEC]|[\xEE-\xEF]|\xF0[\x90-\xBF]|\xF4[\x80-\x8F]|[\xF1-\xF3][\x80-\xBF])[\x80-\xBF])[\x80-\xBF])*/g;
  return string === null || string === undefined? false: string.split('').every(char => char.match(utf8)[0].length > 0);
}

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

Date.prototype.toShortFormat = function(daysToAdd) {

  let monthNames =["Jan","Feb","Mar","Apr",
                    "May","Jun","Jul","Aug",
                    "Sep", "Oct","Nov","Dec"];
  
  let date = new Date();
  date = date.addDays(daysToAdd);

  let day = date.getDate();
  
  let monthIndex = date.getMonth();
  let monthName = monthNames[monthIndex];
  
  let year = date.getFullYear();
  
  return `${day}-${monthName}-${year}`;  
}

Date.prototype.toSearchableFormat = function(daysToAdd) {
  let date = new Date();
  date = date.addDays(daysToAdd);
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

class Blog extends Component {

  constructor(props){
    super(props);
    this.state = {
      classes: makeStyles((theme) => ({
        mainGrid: {
          marginTop: theme.spacing(3),
        },
      })),
      sections: [
        { title: 'Bitcoin', url: '?q=bitcoin' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Technology', url: '?q=technology' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Design', url: '?q=design' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Culture', url: '?q=culture' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Business', url: '?q=business' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Politics', url: '?q=politics' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Opinion', url: '?q=opinion' + "&from=" + Date.prototype.toSearchableFormat(0)},
        { title: 'Science', url: '?q=science' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Health', url: '?q=health'  + "&from=" + Date.prototype.toSearchableFormat(0)},
        { title: 'Style', url: '?q=style' + "&from=" + Date.prototype.toSearchableFormat(0) },
        { title: 'Travel', url: '?q=travel' + "&from=" + Date.prototype.toSearchableFormat(0) },
      ],
      mainFeaturedPost: {},
      featuredPosts: [],
      sidebar: {
        title: 'About',
        description:
          'This is a web app, made by @johnnatandev on React, this site uses the template at https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/blog and the public API library of https://newsapi.org/',
        archives: [
          { title: Date.prototype.toShortFormat(0), url: "&from=" + Date.prototype.toSearchableFormat(0) },
          { title: Date.prototype.toShortFormat(-1), url: "&from=" + Date.prototype.toSearchableFormat(-1) },
          { title: Date.prototype.toShortFormat(-2), url: "&from=" + Date.prototype.toSearchableFormat(-2) },
          { title: Date.prototype.toShortFormat(-3), url: "&from=" + Date.prototype.toSearchableFormat(-3) },
          { title: Date.prototype.toShortFormat(-4), url: "&from=" + Date.prototype.toSearchableFormat(-4) },
          /*{ title: 'September 1999', url: '#' },
          { title: 'August 1999', url: '#' },
          { title: 'July 1999', url: '#' },
          { title: 'June 1999', url: '#' },
          { title: 'May 1999', url: '#' },
          { title: 'April 1999', url: '#' },*/
        ],
        social: [
          { name: 'GitHub', icon: GitHubIcon, url: "https://github.com/JohnnyCoRuyzo" },
          { name: 'Instagram', icon: InstagramIcon, url: "https://www.instagram.com/johnnatandev/" },
          { name: 'LinkedIn', icon: LinkedInIcon, url: "https://linkedin.com/in/johnnatanruizsanchez" },
        ],
      },
    }
    
  }

  componentDidMount(){
    //
    let extensionUrl = document.baseURI.replace(window.location.protocol + "//" + window.location.host + '/','');
    if(extensionUrl === ''){
      window.location.href = window.location.protocol + "//" + window.location.host + '?q=bitcoin&from='+Date.prototype.toSearchableFormat(0);
    }
    else{
      let searchTerm = extensionUrl;
      fetch("https://newsapi.org/v2/everything" + searchTerm + "&sortBy=publishedAt&apiKey=def59b2c8beb4495896b7bd46a19ca4a", {
        "method": "GET"
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          mainFeaturedPost: response.articles.filter(elem => validateUTF8(elem.description) && validateUTF8(elem.title))[0],
          featuredPosts: response.articles.filter(elem => validateUTF8(elem.description) && validateUTF8(elem.title)),
        });
      })
      .catch(err => { console.log(err); 
      });
    }

    
  }

  

  render () {
    return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Breaking News" sections={this.state.sections} />
        <main>
          <MainFeaturedPost post={this.state.mainFeaturedPost} />
          <Grid container spacing={4}>
            {this.state.featuredPosts.map((post, index) => (
              index !== 0? 
              <FeaturedPost key={post.title} post={post} /> : ''
            ))}
          </Grid>
          <Grid container spacing={5} className={this.state.classes.mainGrid}>
            <Sidebar
              title={this.state.sidebar.title}
              description={this.state.sidebar.description}
              archives={this.state.sidebar.archives}
              social={this.state.sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Breaking News" description="" />
    </React.Fragment>
  )};
}

export default Blog;