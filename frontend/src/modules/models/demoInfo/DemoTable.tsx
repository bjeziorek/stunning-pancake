import { Button, Flex } from "@radix-ui/themes";
import React from "react";

export const DemoTable: React.FC = () => {
  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <Flex direction="column" gap="4">
       <p>
    The API Gateway is currently offline, which means the system can’t load the
    database and you can’t admire my beautiful tables, sparkling UI fireworks,
    and all the unnecessary-but-people-pay-for-them visual effects I am fully
    capable of producing.
  </p>

  <strong>BUT!</strong>

  <p>
    I can still load mock data so you can admire my superpowers without the
    backend actually being alive.
  </p>

  <p>
    And just to be clear: the ML backend REALLY exists. I simply didn’t bother
    deploying it anywhere because I value my sanity. If you want to play with
    it, clone the repo and have fun. For people who don’t have time, energy, or
    emotional stability to do that, I also recorded videos showing the backend
    doing real, meaningful things.
  </p>

  <Button>
    Yes, fine, show me your allegedly impressive tables — load the mock data
    already
  </Button>

  <Button>
    I refuse to click anything complicated, just play the video and let me
    pretend I understand what’s going on
  </Button>
      </Flex>
    </div>
  );
};
