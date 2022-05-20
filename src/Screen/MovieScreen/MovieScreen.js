import { FlexBox, FlexColumn, InnerSection, SpinnerContainer } from "../../Global.Styles";
import {
  CardsContainer,
  HeroSection,
  InnerHeroSection,
  MoviesTitle,
} from "../HomeScreen/HomeScreen.Styles";
import {
  InfoText,
  MovieDetailsBox,
  MovieImage,
  MovieInfoBox,
  NavigatorContainer,
  NavigatorInnerContainer,
  NavigatorSpan,
  ProgressBar,
  ProgressBarContainer,
  ProgressBarPercentage,
} from "./MovieScreen.Styles";
 import ActorCard from "../../Components/ActorCard/ActorCard";
import { useLocation ,useNavigate,useParams } from "react-router";
import { useCallback, useEffect, useState,} from "react";
import CRUDRequests from "../../API";
import  useSearchQuery  from "../../Utils/querySearch";


function MovieScreen() {
const params =useParams()
const Location = useLocation()
const query = useSearchQuery(Location.search)
const [movie, setMovie]= useState({})
const [isLoading, setIsLoading ]= useState(true)
 const navigator =useNavigate()
  
  const fetchData = useCallback( async() =>{
  const response = await CRUDRequests.get(`/movie/${params.id} ?api_key=dcf2d1463b5703e25fc8d86eb0fce187`)
   setMovie(prevState => (
     response.data));
    setIsLoading (false);
  }, [params.id])
  
  useEffect( ()=>{
    fetchData()
  }, [fetchData])
  
  useEffect( ()=>{
   window.scrollTo(0,0)
  }, [])

 const handelBack = () =>{
  navigator(-1);
 }
 
  return (
    isLoading? <SpinnerContainer/> :<FlexColumn>
      <NavigatorContainer>
        <NavigatorInnerContainer>
          <NavigatorSpan onClick={handelBack}>Back</NavigatorSpan>
          <NavigatorSpan>/{movie.title}</NavigatorSpan>
        </NavigatorInnerContainer>
      </NavigatorContainer>
      <HeroSection
              img={"https://image.tmdb.org/t/p/w500"+ movie.backdrop_path}
      >
        <InnerHeroSection>
          <MovieInfoBox>
            <MovieImage
              src={
                "http://image.tmdb.org/t/p/w1280/"+movie.poster_path
              }
              alt={movie.title}
            />
            <MovieDetailsBox>
              <InfoText margin={"0 0 25px"} fontSize={30} fontWeight={700}>
              {movie.title}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
               {movie.tagline}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={500}>{movie.overview}</InfoText> 
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                IMDB RATING
              </InfoText>
              <ProgressBarContainer>
                <ProgressBar>
                  <ProgressBarPercentage width={ movie.vote_average * 10} />
                </ProgressBar>
                <InfoText margin={"0 20px"} fontSize={16} fontWeight={500}>
                  {movie.vote_average}
                </InfoText>
              </ProgressBarContainer>{" "}
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
               Tags
              </InfoText>
              <FlexBox>
                {movie.genres.map(item => <InfoText margin={"5px 10px"} key={item.id} fontSize={16} fontWeight={500}>{item.name}</InfoText>)}
              </FlexBox>
             
            </MovieDetailsBox>
          </MovieInfoBox>
        </InnerHeroSection>
      </HeroSection>
      <InnerSection>
        <MoviesTitle>Production Companies</MoviesTitle>
        <CardsContainer>
          {movie.production_companies.map(company =><ActorCard
            key={company.id}
            id={company.id}
            name={company.name}
            img={
              "https://image.tmdb.org/t/p/w500" +company.logo_path
            }
          />
          
          )}
        </CardsContainer>
      </InnerSection>
    </FlexColumn>
  );
}

export default MovieScreen;
