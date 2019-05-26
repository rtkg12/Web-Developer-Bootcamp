const mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment');

//Default campground data to be added to the DB
const data = [
  {
    name: 'Ludington State Park, Michigan',
    image:
      'https://cdn.hiconsumption.com/wp-content/uploads/2015/06/Ludington-State-Park-Michigan-0.jpg',
    description:
      '<div class="super_capped"><p><strong>Pro:</strong> Wide terrain variance in a relatively small area<br /><strong>Con:</strong> Pet rules are restrictive</p><p><strong>Please Everyone:</strong> If you have a family with a lot of different tastes, or if you want to switch up your experience from day to day, then Ludington will easily keep you entertained. You have swimming in Lakes Michigan and Hamlin, beach walks, kayak rentals, jet skiing, sand dunes, marshlands, and forests made for nature hikes. The campgrounds offer both year-round and seasonal accommodations.</p><p><strong>Price:</strong> $8.40 a day</p></div>'
  },
  {
    name: 'Arches National Park, Utah',
    image:
      'https://cdn.hiconsumption.com/wp-content/uploads/2015/06/Arches-National-Park-Utah-0.jpg',
    description:
      '<div class="super_capped"><p><strong>Pro:</strong> Several adjacent and nearby campgrounds<br /><strong>Con:</strong> Limited number of campsites</p><p><strong>Stone Garden:</strong> Photo opportunities and challenging trails abound in the twisted Arches National Park where daunting red stones litter the ground with their weather-beaten buttresses reaching high into the sky. Camping is somewhat limited, though you can backpack around, so long as you prove you know what you&#8217;re doing. It&#8217;ss easy to get lost, so anyone who fancies a challenge along with some striking sights to behold is welcome.</p><p><strong>Price:</strong> $10 per vehicle</p></div>'
  },
  {
    name: 'Hawaii Volcanoes National Park, Hawaii',
    image:
      'https://cdn.hiconsumption.com/wp-content/uploads/2015/06/Hawaii-Volcanoes-Nation-Park-Hawaii-0.jpg',
    description:
      '<div class="super_capped"> <p><strong>Pro:</strong> Numerous light hiking or strolling trails<br /> <strong>Con:</strong> It&#8217;s Hawaii, so campsites are expensive and space is limited</p> <p><strong>Liquid Fire:</strong> Hawaii is not known as a camping region due to the resort nature of much of the islands. However, there are a few spots to pitch a tent, and the Volcanoes National Park is one of the most stunning. In the evening you can look out where active volcanoes light up the sky, and during the day you can explore the strange rock formations and unusual flora that have managed to live near the caldera of a lava-spitting monster.</p> <p><strong>Price:</strong> $8 &#8211; $15 per vehicle</p> </div>'
  },
  {
    name: 'Olympic National Park, Washington',
    image:
      'https://cdn.hiconsumption.com/wp-content/uploads/2015/06/Olympic-National-Park-Washington-0.jpg',
    description:
      '<div class="super_capped"> <p><strong>Pro:</strong> Huge choice of campgrounds and camping sites<br /> <strong>Con:</strong> Very dangerous for solo missions</p> <p><strong>Ecological Marvel:</strong> The evergreen state has innumerable places for any outdoor enthusiast, but Olympic has more than just exceptional trees and hiking. It bears three completely different ecosystems, including a rainforest. Hike the hills or watch whales migrate when the season is right. Camp in any of the provided grounds, or spend $5 on a backcountry camping permit and put up your <a title="Airborn: The 7 Best Suspended Tree Tents" href="https://hiconsumption.com/2015/04/best-suspended-tree-tents-for-camping/">suspended tree tent</a> in any of the massive forestland.</p> <p><strong>Price:</strong> $7 &#8211; $20</p> </div>'
  },
  {
    name: 'Joshua Tree National Park, California',
    image:
      'https://cdn.hiconsumption.com/wp-content/uploads/2015/06/Joshua-Tree-National-Park-0.jpg',
    description:
      '<div class="super_capped"> <p><strong>Pro:</strong> Wide differentiation in types of desert landscape<br /> <strong>Con:</strong> Remember: It is still a desert, so take lots of water</p> <p><strong>The Sand Wastes:</strong> Sitting right at the juncture of the Colorado and Mojave desert, Joshua Tree is one of the few really arid places where camping is a delight. There&#8217;s more than 10 mountain peaks in the area if you like to hike, but if going vertical is more your style, strap on your <a title="Built To Scale: The 6 Best Rock Climbing Shoes" href="https://hiconsumption.com/2014/07/best-rock-climbing-shoes/">rock climbing shoes</a> and get ready for some serious scaling. This is a handy winter location since off-season rates apply and it never gets unbearably cold.</p> <p><strong>Price:</strong> $10 &#8211; $20</p> </div>'
  },
  {
    name: 'Everglades National Park, Florida',
    image:
      'https://cdn.hiconsumption.com/wp-content/uploads/2015/06/Everglades-National-Park-Florida-0.jpg',
    description:
      '<div class="super_capped"> <p><strong>Pro:</strong> Lots of locals will give you some strange tours if you ask around<br /> <strong>Con:</strong> Pack <a title="Bug Sprays: The 8 Best Insect Repellents" href="https://hiconsumption.com/2015/05/bug-sprays-best-insect-repellents/">bug spray</a> or be eaten alive</p> <p><strong>Reptile Village:</strong> We don&#8217;t want to send you to a tourist trap, but within the 2,400 square miles, there&#8217;s plenty to do that isn&#8217;t in the brochure. Grab yourself a <a title="Bobbing Along: The 5 Best Fishing Kayaks" href="https://hiconsumption.com/2014/07/best-fishing-kayaks/">fishing kayak</a> and a <a title="Artful Archers: The 7 Best Recurve Bows" href="https://hiconsumption.com/2015/05/best-recurve-bows/">recurve bow</a>, then head out for some of the most amazing game fishing you can imagine. Rent a canoe and find your own fun on the waterways, or pack along your favorite <a title="Climb Time: The 6 Best Mountain Bikes" href="https://hiconsumption.com/2014/07/best-mountain-bikes/">mountain bike</a> to test the remarkably challenging trails.</p> <p><strong>Price:</strong> $5 &#8211; $10</p> </div>'
  },
  {
    name: 'Lake McConaughy, Nebraska',
    image:
      'https://cdn.hiconsumption.com/wp-content/uploads/2015/06/Lake-McConaughy-Nebraska-0.jpg',
    description:
      '<div class="super_capped"> <p><strong>Pro:</strong> Plenty of space to spread out and avoid crowds<br /> <strong>Con:</strong> Very limited things to see in the area</p> <p><strong>Still Waters:</strong> Unless you like corn, there really isn&#8217;t much to see in Nebraska, but for watersport enjoyment without the coastal crowds, and some of the most laid back fishing you can imagine, this is idyllic. White sand beaches, boating, water skiing, and casting opportunities flourish around Lake McConaughy. It truly is a slice of paradise done Americana style. Dune buggy riders and those who enjoy desert adventures can hop over to the Nebraska Sandhills for a very different experience.</p> <p><strong>Price:</strong> $5 per day</p> </div>'
  },
  {
    name: 'Wyalusing Hardwood Forest, Wisconsin',
    image:
      'https://cdn.hiconsumption.com/wp-content/uploads/2015/06/Wyalusing-Hardwood-Forest-Wisconsin-0.jpg',
    description:
      '<div class="super_capped"> <p><strong>Pro:</strong> Plenty of hunting and fishing opportunities<br /> <strong>Con:</strong> Area can be dangerous during hunting seasons</p> <p><strong>Tree Hugger Retreat:</strong> When woodlands, botany, and hiking get your motor running, this is the place to find sun dappled glades full of some of the most astounding trees in the world. Due to the high arboreal content, amateur ornithologists will find all manner of nesting birds in the area who fill the woods with song. You&#8217;ll find less in the way of exciting activities and much more in the way of centering yourself in Zen calm.</p> <p><strong>Price:</strong> Free+</p> </div>'
  }
];

function seedDB() {
  //Remove all Campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Removed campgrounds');
    //Add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, createdCampground) {
        if (err) {
          console.log(err);
        } else {
          console.log('Added ' + seed.name);
          //Create a comment on each campground
          Comment.create(
            {
              text: 'This place is great, but no internet',
              author: 'Homer'
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                createdCampground.comments.push(comment);
                createdCampground.save();
                console.log('Created new comment on campground');
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
