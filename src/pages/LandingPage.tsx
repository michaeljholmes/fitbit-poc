import { Box, Stack, Typography, styled } from "@mui/material";
import { rem } from "polished";
import { useIsMobile, useIsTablet, useIsTabletDown } from "../routing/Template";
import { Copyright } from "../components/Copyright";

const powerUps = [
  {
    header: "Head to head",
    text: "Win your head to head challenges to unlock more power-ups",
    image: "./head-to-head.png",
  },
  {
    header: "Step multiplier",
    text: "Unlock bonuses to enhance your step count",
    image: "./multiplier.png",
  },
  {
    header: "Shield",
    text: "Protect you and your team members from being attacked by other players",
    image: "./shield.png",
  },
  {
    header: "Duvet Day",
    text: "Claim 10,000 steps for a day when you know your steps are going to be low",
    image: "./duvet-day.png",
  },
  {
    header: "Obstacles",
    text: "Use obstacles to slow down your opponents",
    image: "./banana.png",
  },
  {
    header: "Targets",
    text: "Unlock power-ups by beating your daily target",
    image: "./target.png",
  },
];

export const LandingPage = () => {
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();
  const isLessThanMobile = useIsTabletDown();
  console.log(isLessThanMobile);
  return (
    <>
      <Header sx={{ pl: 0.5, pr: 0.5, backgroundPosition: isLessThanMobile ? `calc(50% + ${rem(25)}) 50%` : "center center"}}>
        <Typography
          variant="h1"
          sx={{
            m: 2,
            color: (theme) => theme.palette.common.white,
            zIndex: 2,
            fontSize: isMobile ? "3rem" : "5rem",
            fontFamily: "'Holtwood One SC', serif",
            textAlign: "center",
          }}
        >
          Stride Wars
        </Typography>
        <Typography
          sx={{
            color: "#e9c46a",
            fontFamily: "'Courier New', Courier, monospace;",
            zIndex: 2,
            fontSize: "1.5rem",
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: 900,
          }}
        >
          The ultimate step competition with a twist.
        </Typography>
      </Header>
      <FirstSection>
        <Typography variant="h2" sx={{ mb: rem(20) }}>
          <>🌟 Join Our Inaugural Competition - Launching in Spring! 🌟</>
        </Typography>
        <Typography>
          Get ready for the first ever Stride Wars competition! The 4-week
          competition is the perfect opportunity to team up with your friends,
          family or colleagues and battle it out on the pavement. It's more than
          just a step competition; it's a journey towards better health,
          teamwork, and lots of fun. Gather your squad and prepare for an epic
          step battle starting this Spring!
        </Typography>
      </FirstSection>
      <NotifySection>
        <Typography sx={{ mt: 2 }} variant="h3">
          Get Notified at Launch
        </Typography>
      </NotifySection>
      <Section
        sx={{
          maxWidth: rem(960),
          margin: "auto",
          pl: 2,
          pr: 2,
        }}
      >
        <Paragraph>
          Welcome to Stride Wars, the ultimate step challenge where fitness
          meets fun and strategy! In this exhilarating competition, teams come
          together to battle it out in a quest for step supremacy. Each day,
          participants' steps are counted and synced from their smartphones,
          turning their everyday movements into a competition. But it's more
          than just a step count; it's a strategic game that requires teamwork,
          planning, and a bit of friendly rivalry.
        </Paragraph>
        <Paragraph>
          Stride Wars combines the typical step competition with the element of
          surprise and strategy.{" "}
          <strong>
            Through the use of power ups, the game can change quickly.
          </strong>{" "}
          Do you focus on defending your step count or do you attack other teams
          and make their steps more difficult to achieve?
        </Paragraph>
        <Paragraph>
          You can keep track of what's happening across the{" "}
          <strong>competition in the Live Feed and leader board.</strong> You
          can witness which team is being more defensive and also keep an eye on
          which team is running away with the lead!
        </Paragraph>
        <Paragraph>
          <strong>Your steps are automatically counted!</strong> With your
          smartphone or FitBit, you can set up your device and not have to worry
          about any administration, just focus on completing as many steps as
          you can each day and who you are going to target with your power ups.
        </Paragraph>
        <Stack
          flexDirection={isTablet ? "row" : "column"}
          flexWrap={isTablet ? "wrap" : "nowrap"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            gap: rem(20),
          }}
        >
          {powerUps.map(({ header, text, image }) => (
            <Stack
              flexDirection={"row"}
              sx={{
                justifyContent: "space-between",
                width: isMobile ? rem(320) : isTablet ? rem(400) : rem(420),
                height: isMobile ? "max-content" : rem(100),
                p: isMobile ? rem(10) : rem(20),
                boxShadow: (theme) => theme.shadows[1],
                backgroundColor: "#f9f9f9",
                borderRadius: rem(10),
                border: `${rem(1)} solid #c8c8c8`,
              }}
            >
              <SmallIamge src={image} />
              <Box sx={{ p: rem(10) }}>
                <Typography variant="h2">{header}</Typography>
                <Typography>{text}</Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
        <Paragraph>
          Stride Wars is a gameified way to increase your physical activity and
          push yourself a little bit more each day to earn power-ups for your
          team.
        </Paragraph>
        <Paragraph>
          We are launching this spring and will be hosting the first
          competition! <strong>You can also host your own competitions</strong>,
          perfect for businesses to engage with their employees and promote a
          healthy lifestyle.
        </Paragraph>
        <Paragraph>
          Sign up to receive an email notification when Stride Wars is ready to
          start.
        </Paragraph>
      </Section>
      <NotifySection>
        <Typography sx={{ mt: 2 }} variant="h3">
          Get Notified at Launch
        </Typography>
      </NotifySection>
      <Copyright
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.common.white,
          height: rem(100),
          lineHeight: rem(100),
        }}
        websiteLink="https://www.stridewars/com"
        websiteName="Stride Wars"
      />
    </>
  );
};

const Header = styled(`header`)(({ theme }) => ({
  background: `url("./stridewars_reduced.jpg")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  zIndex: 1,
  "&::before": {
    backgroundColor: theme.palette.common.black,
    opacity: 0.8,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    content: '""',
  },
}));

const Section = styled("section")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const FirstSection = styled(Section)(({ theme }) => ({
  backgroundColor: "#111",
  color: theme.palette.common.white,
  padding: `${rem(30)} ${rem(20)}`,
}));

const NotifySection = styled(Section)({
  backgroundColor: "#f2f2f2",
  height: rem(125),
});

const Paragraph = styled(Typography)({
  textAlign: "justify",
  marginTop: rem(20),
  marginBottom: rem(20),
  alignSelf: "flex-start",
});

const SmallIamge = styled("img")({
  height: rem(100),
  width: rem(100),
});
