export const breadboardHelpers = {
  'styles.css': `/**
  * Sorry this is so ugly. Good thing I'm not writing a design guide :-)
  */
 
 body {
   color: #342656;
   font-family: sans-serif;
 }
 
 .List {
   margin: 2rem;
 }
 .List > * {
   background-color: #f0f4fc;
   padding: 0.75rem 1rem;
   box-shadow:
     1px 0 1px #dae1f2 inset,
     -1px 0 1px #dae1f2 inset;
 }

 .top {
   border-top-left-radius: 10px;
   box-shadow:
     0 1px 1px #dae1f2 inset,
     1px 0 1px #dae1f2 inset,
     -1px 0 1px #dae1f2 inset;
 }
 
 .bottom {
   border-bottom-right-radius: 10px;
   margin-bottom: 0;
   box-shadow:
     0 -1px 1px #dae1f2 inset,
     1px 0 1px #dae1f2 inset,
     -1px 0 1px #dae1f2 inset;
 }
 
 .top.bottom {
   box-shadow:
     0 1px 1px #dae1f2 inset,
     0 -1px 1px #dae1f2 inset,
     1px 0 1px #dae1f2 inset,
     -1px 0 1px #dae1f2 inset;
 }
 
 .highlight {
   background-color: #dae1f2;
 }`
}