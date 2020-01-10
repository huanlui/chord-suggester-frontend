import React from 'react';
import { Tooltip, IconButton, Link } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import DescriptionIcon from '@material-ui/icons/Description';

const SocialIcons = () => {
return (
    <div>
        <Tooltip title="Github Repo" placement="top" arrow>
          <IconButton aria-label="Github Repo">    
              <Link href={'http://github.com/huanlui/chord-suggester'}>
                <GitHubIcon fontSize='large' color='secondary'/>
              </Link>
          </IconButton>
        </Tooltip>
        <Tooltip title="LinkedIn" placement="top" arrow>
          <IconButton aria-label="LinkedIn">    
                <Link href={'https://www.linkedin.com/in/juan-luis-garc%C3%ADa-l%C3%B3pez-99057138/'}>
                  <LinkedInIcon fontSize='large' color='secondary'/>
                </Link>
          </IconButton>
        </Tooltip>
        <Tooltip title="Medium Article" placement="top" arrow>
          <IconButton aria-label="Medium Article">    
                <Link href={'https://medium.com/@huanlui/chordsuggester-i-3a1261d4ea9e'}>
                  <DescriptionIcon fontSize='large' color='secondary'/>
                </Link>
          </IconButton>
        </Tooltip>
        <Tooltip title="Mail" placement="top" arrow>
          <IconButton aria-label="Mail">    
                <Link href={'mailto:juanluis.garcia@thoughtworks.com'}>
                  <MailIcon fontSize='large' color='secondary'/>
                </Link>
          </IconButton>
        </Tooltip>
    </div>
  )
}

export default SocialIcons;