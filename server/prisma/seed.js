const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();
const SAMPLE_NUMBER = 10;

// Create a fake employee list
// Reference: https://blog.alexrusin.com/prisma-seeding-quickly-populate-your-database-for-development/
function createEmployeeList(cafes) {
  const users = [];
  for (let i = 0; i < SAMPLE_NUMBER; i++) {
    const cafeId = faker.number.int({ min: 1, max: 9 });
    const cafeDetails = cafes[cafeId];
    const created_at = faker.date.between({
      from: "2024-01-01",
      to: Date.now(),
    });

    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email_address: faker.internet.email(),
      gender: faker.number.binary() == 1 ? "MALE" : "FEMALE",
      created_at,
      phone_number: faker.phone.number({ style: "international" }),
      cafe_id: cafeDetails.id,
    });
  }
  return users;
}

function createCafeList() {
  const cafes = [];
  for (let i = 0; i < SAMPLE_NUMBER; i++) {
    cafes.push({
      id: faker.string.uuid(),
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      location: faker.location.city(),
      logo: faker.image.url(),
    });
  }
  return cafes;
}

async function main() {
  const cafes = createCafeList();
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        first_name: "Marrissa",
        last_name: "Kingscote",
        email: "mkingscote0@shareasale.com",
        gender: "FEMALE",
        phone: "245-179-4884",
      },
      {
        id: 2,
        first_name: "Ericka",
        last_name: "Klimczak",
        email: "eklimczak1@twitter.com",
        gender: "FEMALE",
        phone: "200-978-0491",
      },
      {
        id: 3,
        first_name: "Ivett",
        last_name: "Goshawk",
        email: "igoshawk2@illinois.edu",
        gender: "FEMALE",
        phone: "720-689-5317",
      },
      {
        id: 4,
        first_name: "Gram",
        last_name: "Henrionot",
        email: "ghenrionot3@cdc.gov",
        gender: "MALE",
        phone: "614-794-4468",
      },
      {
        id: 5,
        first_name: "Deina",
        last_name: "Furnival",
        email: "dfurnival4@yahoo.co.jp",
        gender: "FEMALE",
        phone: "115-780-3555",
      },
      {
        id: 6,
        first_name: "Guy",
        last_name: "Cosford",
        email: "gcosford5@mac.com",
        gender: "MALE",
        phone: "497-335-4817",
      },
      {
        id: 7,
        first_name: "Caitrin",
        last_name: "Currer",
        email: "ccurrer6@boston.com",
        gender: "FEMALE",
        phone: "928-112-8694",
      },
      {
        id: 8,
        first_name: "Jamal",
        last_name: "Dosedale",
        email: "jdosedale7@sitemeter.com",
        gender: "MALE",
        phone: "148-790-7657",
      },
      {
        id: 9,
        first_name: "Antony",
        last_name: "Crawshay",
        email: "acrawshay8@ebay.com",
        gender: "MALE",
        phone: "176-275-9996",
      },
      {
        id: 10,
        first_name: "Reine",
        last_name: "Zamorrano",
        email: "rzamorrano9@instagram.com",
        gender: "FEMALE",
        phone: "554-950-1907",
      },
      {
        id: 11,
        first_name: "Flor",
        last_name: "Swainsbury",
        email: "fswainsburya@friendfeed.com",
        gender: "FEMALE",
        phone: "517-698-7611",
      },
      {
        id: 12,
        first_name: "Hyacinthe",
        last_name: "Bowley",
        email: "hbowleyb@people.com.cn",
        gender: "FEMALE",
        phone: "597-587-6743",
      },
      {
        id: 13,
        first_name: "Nanete",
        last_name: "Peteri",
        email: "npeteric@over-blog.com",
        gender: "MALE",
        phone: "658-575-0230",
      },
      {
        id: 14,
        first_name: "Xena",
        last_name: "McGlade",
        email: "xmcgladed@oakley.com",
        gender: "FEMALE",
        phone: "714-445-8865",
      },
      {
        id: 15,
        first_name: "Merill",
        last_name: "Sainsbury-Brown",
        email: "msainsburybrowne@washington.edu",
        gender: "MALE",
        phone: "290-693-4226",
      },
      {
        id: 16,
        first_name: "Hortensia",
        last_name: "Kneller",
        email: "hknellerf@lycos.com",
        gender: "FEMALE",
        phone: "230-269-8490",
      },
      {
        id: 17,
        first_name: "Florance",
        last_name: "Bingall",
        email: "fbingallg@youku.com",
        gender: "FEMALE",
        phone: "315-282-3253",
      },
      {
        id: 18,
        first_name: "Merrill",
        last_name: "Priestley",
        email: "mpriestleyh@gmpg.org",
        gender: "FEMALE",
        phone: "403-107-1169",
      },
      {
        id: 19,
        first_name: "Laura",
        last_name: "Acheson",
        email: "lachesoni@nydailynews.com",
        gender: "FEMALE",
        phone: "253-814-2080",
      },
      {
        id: 20,
        first_name: "Orv",
        last_name: "Tatlowe",
        email: "otatlowej@narod.ru",
        gender: "MALE",
        phone: "632-360-0310",
      },
      {
        id: 21,
        first_name: "Oren",
        last_name: "Pretorius",
        email: "opretoriusk@loc.gov",
        gender: "MALE",
        phone: "528-484-9759",
      },
      {
        id: 22,
        first_name: "Byran",
        last_name: "Kunneke",
        email: "bkunnekel@dedecms.com",
        gender: "MALE",
        phone: "539-688-4366",
      },
      {
        id: 23,
        first_name: "Norman",
        last_name: "Phillcox",
        email: "nphillcoxm@cam.ac.uk",
        gender: "MALE",
        phone: "315-238-0877",
      },
      {
        id: 24,
        first_name: "Mellisent",
        last_name: "Coopland",
        email: "mcooplandn@nytimes.com",
        gender: "FEMALE",
        phone: "170-557-7725",
      },
      {
        id: 25,
        first_name: "Bev",
        last_name: "Rosenstiel",
        email: "brosenstielo@google.com.hk",
        gender: "FEMALE",
        phone: "572-494-4507",
      },
      {
        id: 26,
        first_name: "Pincas",
        last_name: "Donaher",
        email: "pdonaherp@deviantart.com",
        gender: "MALE",
        phone: "261-910-0173",
      },
      {
        id: 27,
        first_name: "Magdalen",
        last_name: "MacAindreis",
        email: "mmacaindreisq@wiley.com",
        gender: "FEMALE",
        phone: "249-583-6131",
      },
      {
        id: 28,
        first_name: "Nana",
        last_name: "Glencrosche",
        email: "nglencroscher@skype.com",
        gender: "FEMALE",
        phone: "546-923-0431",
      },
      {
        id: 29,
        first_name: "Willie",
        last_name: "Landreth",
        email: "wlandreths@tinyurl.com",
        gender: "FEMALE",
        phone: "207-243-5680",
      },
      {
        id: 30,
        first_name: "Roland",
        last_name: "McKue",
        email: "rmckuet@rediff.com",
        gender: "MALE",
        phone: "480-422-8736",
      },
      {
        id: 31,
        first_name: "Geordie",
        last_name: "Bailey",
        email: "gbaileyu@i2i.jp",
        gender: "MALE",
        phone: "552-255-4971",
      },
      {
        id: 32,
        first_name: "Archibaldo",
        last_name: "Wellen",
        email: "awellenv@domainmarket.com",
        gender: "MALE",
        phone: "977-614-2981",
      },
      {
        id: 33,
        first_name: "Thaddeus",
        last_name: "Lidgey",
        email: "tlidgeyw@theatlantic.com",
        gender: "MALE",
        phone: "971-569-4536",
      },
      {
        id: 34,
        first_name: "Bartie",
        last_name: "De Metz",
        email: "bdemetzx@wufoo.com",
        gender: "MALE",
        phone: "429-952-2525",
      },
      {
        id: 35,
        first_name: "Hirsch",
        last_name: "Anand",
        email: "hanandy@disqus.com",
        gender: "MALE",
        phone: "438-764-6415",
      },
      {
        id: 36,
        first_name: "Vere",
        last_name: "Eakens",
        email: "veakensz@friendfeed.com",
        gender: "FEMALE",
        phone: "408-951-0500",
      },
      {
        id: 37,
        first_name: "Anetta",
        last_name: "Conklin",
        email: "aconklin10@ycombinator.com",
        gender: "FEMALE",
        phone: "608-732-3012",
      },
      {
        id: 38,
        first_name: "Rufe",
        last_name: "Glassard",
        email: "rglassard11@jiathis.com",
        gender: "MALE",
        phone: "590-396-2473",
      },
      {
        id: 39,
        first_name: "Tiffany",
        last_name: "Catenot",
        email: "tcatenot12@zdnet.com",
        gender: "FEMALE",
        phone: "806-633-9072",
      },
      {
        id: 40,
        first_name: "Anne",
        last_name: "Willison",
        email: "awillison13@moonfruit.com",
        gender: "FEMALE",
        phone: "516-278-0076",
      },
      {
        id: 41,
        first_name: "Hailee",
        last_name: "De Blasio",
        email: "hdeblasio14@printfriendly.com",
        gender: "FEMALE",
        phone: "726-101-1066",
      },
      {
        id: 42,
        first_name: "Hazlett",
        last_name: "Gibbins",
        email: "hgibbins15@bluehost.com",
        gender: "MALE",
        phone: "100-609-0988",
      },
      {
        id: 43,
        first_name: "Daniel",
        last_name: "Dufall",
        email: "ddufall16@bloomberg.com",
        gender: "MALE",
        phone: "147-100-4126",
      },
      {
        id: 44,
        first_name: "Thomasine",
        last_name: "Hamsher",
        email: "thamsher17@buzzfeed.com",
        gender: "FEMALE",
        phone: "681-858-2434",
      },
      {
        id: 45,
        first_name: "Jaclyn",
        last_name: "Missen",
        email: "jmissen18@virginia.edu",
        gender: "FEMALE",
        phone: "900-736-1808",
      },
      {
        id: 46,
        first_name: "Franzen",
        last_name: "Scarfe",
        email: "fscarfe19@va.gov",
        gender: "MALE",
        phone: "570-428-1371",
      },
      {
        id: 47,
        first_name: "Garey",
        last_name: "Morrid",
        email: "gmorrid1a@taobao.com",
        gender: "MALE",
        phone: "178-562-3009",
      },
      {
        id: 48,
        first_name: "Eal",
        last_name: "Rospars",
        email: "erospars1b@icq.com",
        gender: "MALE",
        phone: "564-644-1926",
      },
      {
        id: 49,
        first_name: "Norbert",
        last_name: "Chamney",
        email: "nchamney1c@omniture.com",
        gender: "FEMALE",
        phone: "109-912-0459",
      },
      {
        id: 50,
        first_name: "Ronica",
        last_name: "Fitchen",
        email: "rfitchen1d@123-reg.co.uk",
        gender: "FEMALE",
        phone: "202-936-0111",
      },
    ],
  });

  await prisma.cafe.createMany({
    data: cafes,
  });

  await prisma.employee.createMany({
    data: createEmployeeList(cafes),
  });
}

async function init() {
  const users = await prisma.user.count();

  if (users === 0) {
    main()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
    console.log("Database is successully seeded");
  } else {
    console.log("Database seeding is not needed");
  }
}

init();
